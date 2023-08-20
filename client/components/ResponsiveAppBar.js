import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import {Icon} from "@iconify/react";
import {Logo} from "./Logo";
import {useGetCurrentUser} from "../customeHooks/useGetCurrentUser";
import {Button, Input} from "@mui/material";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";

const appBarItems = [
  {
    link: "/store",
    label: "E-Diabuddies",
    icon: "iconamoon:store-light",
  },
  {
    link: "/blog/articles",
    label: "Diablog",
    icon: "majesticons:article-line",
  },
  {
    link: "/store/wish_list",
    label: "My WishList",
    icon: "mdi:heart-outline",
  },
  {
    link: "/pdf",
    label: "Generate PDF",
    icon: "teenyicons:pdf-outline",
  },
  {
    link: "/guide",
    label: "Guide",
    icon: "majesticons:document-line",
  },
  {
    link: "/help",
    label: "Help Center",
    icon: "material-symbols:help-outline",
  },
  {
    link: "/settings",
    label: "Settings",
    icon: "solar:settings-linear",
  },
  {
    link: "/logout",
    label: "Logout",
    icon: "solar:logout-2-linear",
  },
];

function ResponsiveAppBar() {
  const { user } = useGetCurrentUser();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElChatBot, setAnchorElChatBot] = React.useState(null);
  const [userQuestion, setUserQuestion] = React.useState("");
  const [discussion, setDiscussion] = React.useState([
    {
      role: "assistant",
      content: "How can I help you today?",
    },
  ]);

  const { mutate: askAI, isLoading } = useMutation({
    mutationFn: (userQuestion) => {
      return axios.post("/api/aiAssistant/assistant",
      {
              userInputs: [...discussion, userQuestion]
            });
    },
    onMutate: (userQuestion) => {
      setUserQuestion("");
      setDiscussion([...discussion, userQuestion]);
    },
    onSuccess: (result) => {
      console.log("result", result);
      setDiscussion([...discussion, result.data.assistantOutput]);
    },
    onError: (error, variables) => {
      console.error(error);
      setDiscussion([
        ...discussion,
        {
          role: "assistant",
          content: "There was an error, please ask me again!",
        },
      ]);
    },
  });
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" className="bg-transparent shadow-none">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Profile photo" src={user?.photo} className="h-12 w-12" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px", "& .MuiPaper-root.MuiMenu-paper": { borderRadius: "15px" } }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {appBarItems.map((appBarItem, i) => (
                <Link key={i} href={appBarItem.link} passHref>
                  <MenuItem key={appBarItems.link} onClick={handleCloseUserMenu} className="flex">
                    <Icon icon={appBarItem.icon} className="h-6 w-6 mr-2 text-diaGray" />
                    <Typography textAlign="center">{appBarItem.label}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
        <Box>
          <Tooltip title="Chat with your AI assistant">
            <IconButton
              className={"fixed bottom-10 right-10 bg-diaDarkBlue text-white p-2"}
              onClick={(event) => setAnchorElChatBot(event.currentTarget)}
              sx={{ p: 0, zIndex: 1000 }}
            >
              <Icon icon={"healthicons:doctor-outline"} className="h-10 w-10" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{
              "& .MuiPaper-root.MuiMenu-paper": {
                borderRadius: "15px",
                width: "300px",
                padding: "10px 5px",
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
            <div className={"flex justify-between align-middle"}>
              <h3>Your Assistant: DiaDoctor</h3>
              <IconButton className={"-mt-2"} onClick={() => setAnchorElChatBot(null)}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className={"h-[300px] scroll-auto overflow-y-scroll pb-5"}>
              {discussion.map(({ role, content }) => (
                <div className={"flex justify-between gap-2 pb-2"}>
                  {role !== "assistant" ? (
                    <Avatar alt="Profile photo" src={user?.photo} className="h-7 w-7" />
                  ) : (
                    <div>
                      <Icon icon={"healthicons:doctor-outline"} className="h-7 w-7" />
                    </div>
                  )}
                  <p className={"bg-gray-100 rounded-md p-1 w-full"}>{content}</p>
                </div>
              ))}
              {isLoading && <div>diaDoctor: ...</div>}
            </div>
            <div className={"flex justify-between gap-2 pt-2"}>
              <Input
                label={"your message here"}
                className={"block h-[35px] border rounded p-1 "}
                placeholder={"Ask your question..."}
                value={userQuestion}
                onChange={(e) => {
                  setUserQuestion(e.target.value);
                }}
              />
              <Button
                className={"bg-green-500 text-white w-[100px]"}
                onClick={() => {
                  askAI({ role: "user", content: userQuestion });
                }}
              >
                Ask AI
              </Button>
            </div>
          </Menu>
        </Box>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
