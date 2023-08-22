import Box from "@mui/material/Box";
import {LinearProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Icon} from "@iconify/react";
import * as React from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import ScienceIcon from '@mui/icons-material/Science';
import IconButton from "@mui/material/IconButton";

export const GamifyProgressBar = () => {
  const {data:gamify, isLoading:isLoadingGamification} = useQuery(["gamify"],async ()=>{
    const {data} = await axios.get("/api/gamify/")
    return data
  })
  const queryClient = useQueryClient()
  return (
      <>
      {!isLoadingGamification && gamify &&
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '200px', mr: 1, mt:2 }}>
                <LinearProgress
                    sx={{
                        height: "20px",
                        borderRadius: "2px",
                        "&.MuiLinearProgress-bar1Determinate": {
                            backgroundColor: "#1e293b"
                        }
                    }}
                    variant="determinate"
                    value={(gamify.points/gamify.level.maxPoints*100)} />
                <Typography variant="body2" color="text.secondary">
                    {gamify.level.levelName}
                </Typography>
            </Box>
            <Box sx={{ minWidth: 60,mr: 1 }}>
                <Typography variant="body2" color="text.secondary">
                    {gamify.points} / {gamify.level.maxPoints}
                  {gamify.dailyLogInClaimed ?
                    <Icon icon="carbon:chemistry" className={"inline-block text-lg mb-1 text-diaDarkBlue"} /> :
                      <IconButton onClick={()=>{
                        axios.post("/api/daily_log_in").then((res)=>{
                          if(res.data.message === "claimed"){
                            queryClient.invalidateQueries(["gamify"])
                          }
                        })
                      }}>
                        <ScienceIcon />
                      </IconButton>
                  }
                </Typography>
            </Box>
        </Box>}
      </>
  )
}