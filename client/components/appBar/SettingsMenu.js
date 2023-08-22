import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Link from "next/link";
import MenuItem from "@mui/material/MenuItem";
import {Icon} from "@iconify/react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";
import {useGetCurrentUser} from "../../customeHooks/useGetCurrentUser";
import {appBarItems} from "./appBarItems";

export const SettingsMenu = () => {
    const { user } = useGetCurrentUser();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
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
                <MenuItem onClick={()=>{
                    axios.post("/api/gamify")
                }}>
                    <Typography textAlign="center">Create Your Gamification</Typography>
                </MenuItem>
            </Menu>
        </>
    )
}