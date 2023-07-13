import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";

const settings = ["Settings", "Logout"];

function ResponsiveAppBar({ props }) {
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
          <Box sx={{ flexGrow: 1, ml: -2, display: { xs: "flex", md: "none" } }}>
            <IconButton size="small" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" className="text-diaGray">
              <Image src={"/diabuddies_logo_D.webp"} priority height={65} width={65} className="bg-transparent" alt="diabuddies logo" />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1, ml: -2, display: { xs: "none", md: "flex" } }}>
            <div className="relative">
              <Image src={"/diabuddies_logo.png"} width={130} height={90} className="bg-transparent my-0 mx-5" alt="diabuddies logo" />
            </div>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Profile photo" src={props.photo} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
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
              {settings.map((setting, i) => (
                <Link key={i} href={`/${setting.toLowerCase()}`} passHref>
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
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
