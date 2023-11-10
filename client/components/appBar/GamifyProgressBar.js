import Box from "@mui/material/Box";
import { LinearProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Badge from "@mui/material/Badge";
import { useTranslation } from "next-i18next";
import Image from "next/image";

export const GamifyProgressBar = () => {
  const { data: gamify, isLoading: isLoadingGamification } = useQuery(["gamify"], async () => {
    const { data } = await axios.get("/api/gamify/");
    console.log(data);
    return data;
  });
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  return (
    <>
      {!isLoadingGamification && gamify && (
        <Box sx={{ position: "relative", overflow: "hidden", display: "grid", gridTemplateColumns: "repeat(10,minmax(0,1fr))", alignItems: "center" }} className={"bg-white rounded-3xl shadow-md my-5"}>
          <div className="w-14 blur-2xl bg-diaOrange absolute left-3 bottom-0 top-0"></div>
          <Box sx={{ gridColumn: "span 2 / span 2" }}>
            <Typography variant="body2" className="grid gap-1 justify-items-center items-center text-center">
              {gamify?.dailyLogInClaimed ? (
                <div className="relative flex justify-center items-center w-20 h-20">
                  <Image src={"/reward_badges/lvl1.png"} objectFit="contain" layout="fill" />
                </div>
              ) : (
                <Badge
                  color="secondary"
                  variant="dot"
                  onClick={() => {
                    axios.post("/api/daily_log_in").then((res) => {
                      if (res.data.message === "claimed") {
                        queryClient.invalidateQueries(["gamify"]);
                      }
                    });
                  }}
                  sx={{
                    "& span": {
                      top: "15px",
                      marginRight: "20px",
                      height: "15px",
                      width: "15px",
                      borderRadius: "100px",
                      backgroundColor: "#3AB0FF",
                    },
                  }}
                >
                  <div className="relative flex justify-center items-center w-20 h-20">
                    <Image src={"/reward_badges/lvl1.png"} objectFit="contain" layout="fill" />
                  </div>
                </Badge>
              )}
            </Typography>
          </Box>
          <Box sx={{ display: "grid", width: "100%", gridColumn: "span 8 / span 8", alignItems: "center", position: "relative" }}>
            <div className="flex items-center py-2">
              <Typography className="font-inter font-semibold text-lg text-diaDarkBlue w-full items-center">{`${i18n.language !== "ar" ? `${gamify?.level.level}th level, you're off to a great journey!` : `المستوى ${gamify?.level.level}، أنت في رحلة رائعة!`}`}</Typography>
            </div>
            <Box sx={{ display: "grid", alignItems: "center", width: "full", paddingInlineEnd: "1rem" }}>
              <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress
                  sx={{
                    height: "8px",
                    width: "calc(100%)",
                    borderRadius: "15px",
                    "& .MuiLinearProgress-barColorPrimary": {
                      backgroundColor: "#3AB0FF",
                    },
                    "&.MuiLinearProgress-root": {
                      backgroundColor: "#D9D9D9",
                    },
                  }}
                  variant="determinate"
                  value={(gamify?.points / gamify?.level.maxPoints) * 100}
                />
              </Box>
              <Box sx={{ minWidth: 60, textAlign: "start" }}>
                <Typography color="text.secondary" className="font-inter text-diaDarkBlue text-2xs m-2">
                  {`${i18n.language !== "ar" ? `${gamify?.points} point of ${gamify?.level.maxPoints}` : `${gamify?.points} نقطة من ${gamify?.level.maxPoints}`}`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
