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
import { Icon } from "@iconify/react";
import { Logo } from "./Logo";
import { useGetCurrentUser } from "../customeHooks/useGetCurrentUser";

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
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
