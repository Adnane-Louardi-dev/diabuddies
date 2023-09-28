import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Link from "next/link";
import MenuItem from "@mui/material/MenuItem";
import {Icon} from "@iconify/react";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useGetCurrentUser} from "../../customeHooks/useGetCurrentUser";
import {appBarItems} from "./appBarItems";
import {useTranslation} from "next-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import {useRouter} from "next/router";
import {getDir} from "../../utils/getDir";
import {AvatarSkeleton} from "../skeleton/avatarSkeleton";

export const SettingsMenu = () => {
    const { user, isLoading} = useGetCurrentUser();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const {t,i18n} = useTranslation();
    const router = useRouter();
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
                    {!isLoading ?
                        <Avatar alt="Profile photo" src={user?.photo} className="h-12 w-12"/> :
                        <AvatarSkeleton />}
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px",
                    "& .MuiPaper-root.MuiMenu-paper": {
                    borderRadius: "15px"
                    },
                    direction: getDir(i18n.language)
            }}
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
                        <MenuItem key={appBarItem.link} onClick={handleCloseUserMenu} className="flex">
                            <Icon icon={appBarItem.icon} className={`h-6 w-6 text-diaGray ${i18n.language === "ar" ? "ml-2" : "mr-2"}`} />
                            <Typography textAlign="center">{!!appBarItem.localLabel? t(appBarItem.localLabel) : appBarItem.label}</Typography>
                        </MenuItem>
                    </Link>
                ))}
                <MenuItem className={"flex justify-between"} dir={"ltr"}>
                    <IconButton
                        onClick={()=>{
                            router.push(
                                {
                                    pathname: router.pathname,
                                    query: router.query,
                                },
                                null,
                                {locale: "ar"}
                            )
                        }}
                        >
                        <Icon icon={"emojione:flag-for-morocco"} />
                    </IconButton>
                    <IconButton
                        onClick={()=>{
                            router.push(
                                {
                                    pathname: router.pathname,
                                    query: router.query,
                                },
                                null,
                                {locale: "en"}
                            )
                        }}
                        >
                        <Icon icon={"emojione:flag-for-united-kingdom"} />
                    </IconButton>
                </MenuItem>
            </Menu>
        </>
    )
}