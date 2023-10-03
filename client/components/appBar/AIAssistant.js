import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { Icon } from "@iconify/react";
import Menu from "@mui/material/Menu";
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useGetCurrentUser } from "../../customeHooks/useGetCurrentUser";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import LoadingCircle from "../loadingCircle";
import {AvatarSkeleton} from "../skeleton/avatarSkeleton";

export const AIAssistant = () => {
  const { user, isLoading:isUserLoading } = useGetCurrentUser();
  const [anchorElChatBot, setAnchorElChatBot] = React.useState(null);
  const [userQuestion, setUserQuestion] = React.useState("");
  const { t, i18n } = useTranslation();
  const [discussion, setDiscussion] = React.useState([]);

  useEffect(() => {
    setDiscussion([
      {
        role: "assistant",
        content: i18n.language === "ar" ? "السلام عليكم، كيف يمكنني مساعدتك اليوم؟" : "How can I help you today?",
      },
    ]);
  }, [i18n.language]);

  const { mutate: askAI, isLoading } = useMutation({
    mutationFn: (userQuestion) => {
      return axios.post("/api/aiAssistant/assistant", {
        userInputs: [...discussion, userQuestion],
      });
    },
    onMutate: (userQuestion) => {
      setUserQuestion("");
      setDiscussion([...discussion, userQuestion]);
    },
    onSuccess: (result) => {
      setDiscussion([...discussion, result.data.assistantOutput]);
    },
    onError: (error) => {
      setDiscussion([
        ...discussion,
        {
          role: "assistant",
          content: "There was an error, please ask me again!",
        },
      ]);
    },
  });
  return (
    <Box>
      <Tooltip title="Chat with your AI assistant">
        <IconButton className={"fixed bottom-20 right-10 bg-diaDarkBlue text-white p-2"} onClick={(event) => setAnchorElChatBot(event.currentTarget)} sx={{ p: 0, zIndex: 1000 }}>
          <Icon icon={"healthicons:doctor-outline"} className="h-10 w-10" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{
          "& .MuiPaper-root.MuiMenu-paper": {
            borderRadius: "15px",
            width: "300px",
          },
          "& .MuiMenu-list": {
            paddingTop: 0,
          },
        }}
        id="menu-appbar"
        anchorEl={anchorElChatBot}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={Boolean(anchorElChatBot)}
        onClose={() => setAnchorElChatBot(null)}
      >
        <div className={"flex justify-between align-middle mb-2 p-2 bg-diaDarkBlue text-white"}>
          <h3>{t("assistant_name")}</h3>
          <IconButton className={"-mt-2 text-white"} onClick={() => setAnchorElChatBot(null)}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={"mx-3"}>
          <div className={"h-[300px] scroll-auto overflow-y-scroll pb-5"}>
            {discussion.map(({ role, content }, i) => (
              <div key={i} className={"flex justify-between gap-2 pb-2"}>
                {role !== "assistant" ? !isUserLoading ?
                        <Avatar alt="Profile photo" src={user?.photo} className="h-7 w-7"/> :
                        <AvatarSkeleton size={7} />
                    : (
                  <div>
                    <Icon icon={"healthicons:doctor-outline"} className="h-7 w-7" />
                  </div>
                )}
                <p className={"bg-gray-100 rounded-md p-1 w-full"}>{content}</p>
              </div>
            ))}
            {isLoading && <div className={"flex align-middle"}>
                  <Icon icon={"healthicons:doctor-outline"} className="h-7 w-7" />
                  <Icon icon={"eos-icons:three-dots-loading"} className="h-7 w-7 mt-1" />
              </div>}
          </div>
          <div className={"flex justify-between gap-2 pt-2"}>
            <TextField
              label={t("question_input")}
              className={"block border rounded"}
              size={"small"}
              placeholder={"Ask your question..."}
              value={userQuestion}
              onChange={(e) => {
                setUserQuestion(e.target.value);
              }}
            />
            <Button
              className={"bg-diaDarkBlue text-white w-[100px]"}
              onClick={() => {
                askAI({ role: "user", content: userQuestion });
              }}
            >
              {t("ask_ai")}
            </Button>
          </div>
        </div>
      </Menu>
    </Box>
  );
};
