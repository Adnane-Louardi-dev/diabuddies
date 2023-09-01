import Box from "@mui/material/Box";
import {LinearProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Icon} from "@iconify/react";
import * as React from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import ScienceIcon from "@mui/icons-material/Science";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";

export const GamifyProgressBar = () => {
  const { data: gamify, isLoading: isLoadingGamification } = useQuery(["gamify"], async () => {
    const { data } = await axios.get("/api/gamify/");
    return data;
  });
  const queryClient = useQueryClient();
  return (
    <>
      {!isLoadingGamification && gamify && (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(10,minmax(0,1fr))" }} className={"border-2 border-diaBlue bg-sky-200 rounded-lg p-2 my-5"}>
          <Box sx={{ gridColumn: "span 2 / span 2" }}>
            <Typography variant="body2" color="text.secondary" className="grid gap-1 justify-items-center text-center">
              {gamify.dailyLogInClaimed ? (
                <Icon icon="carbon:chemistry" className={"self-center h-10 w-10 text-diaDarkBlue"} />
              ) : (
                <IconButton
                  onClick={() => {
                    axios.post("/api/daily_log_in").then((res) => {
                      if (res.data.message === "claimed") {
                        queryClient.invalidateQueries(["gamify"]);
                      }
                    });
                  }}
                >
                  <ScienceIcon />
                </IconButton>
              )}
            </Typography>
          </Box>
          <Box sx={{ display: "grid", width: "full", gridColumn: "span 7 / span 7" }}>
            <Typography variant="body2" color="text.secondary" className="font-sourceCode font-semibold">
              {gamify.level.levelName}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress
                  sx={{
                    height: "10px",
                    width: "calc(100% - 60px)",
                    borderRadius: "10px",
                    "&.MuiLinearProgress-bar1Determinate": {
                      backgroundColor: "#1e293b",
                    },
                  }}
                  variant="determinate"
                  value={(gamify.points / gamify.level.maxPoints) * 100}
                />{" "}
              </Box>
              <Box sx={{ minWidth: 60 }}>
                <Typography variant="body2" color="text.secondary">{gamify.points} / {gamify.level.maxPoints}</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "grid", gridColumn: "span 1 / span 1" }} className="items-center justify-items-center">
            <Link href={"/gamification"} aria-label="Charts page" passHref>
              <Icon icon="ep:arrow-right-bold" className="self-center h-6 w-6 text-diaDarkBlue" />
            </Link>
          </Box>
        </Box>
      )}
    </>
  );
};
