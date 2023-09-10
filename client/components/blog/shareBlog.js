import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    RedditIcon,
    RedditShareButton,
    TelegramIcon,
    TelegramShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";
import React from "react";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import {ShareRounded} from "@mui/icons-material";


export const ShareBlog = ({title}) => {
    const [anchorShareButton, setAnchorShareButton] = React.useState(null);
    const url =  window.location.href
    const handleOpenUserMenu = (event) => {
        setAnchorShareButton(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorShareButton(null);
    };

    return <>
        <IconButton onClick={(e)=>{
            e.preventDefault();
            e.stopPropagation();
            handleOpenUserMenu(e);
        }} >
            <ShareRounded />
        </IconButton>
        <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorShareButton}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={Boolean(anchorShareButton)}
            onClose={handleCloseUserMenu}
        >
            <div className={"w-[200px] px-3 rounded flex justify-between"}>
                <FacebookShareButton quote={title} url={url} >
                    <FacebookIcon size={30} round />
                </FacebookShareButton>
                <RedditShareButton title={title} url={url}>
                    <RedditIcon size={30} round />
                </RedditShareButton>
                <TelegramShareButton title={title} url={url}>
                    <TelegramIcon size={30} round />
                </TelegramShareButton>
                <WhatsappShareButton title={title} url={url}>
                    <WhatsappIcon size={30} round />
                </WhatsappShareButton>
                <EmailShareButton subject={title} body={"ahmedtanaltbenahmed@gmail.com"}>
                    <EmailIcon size={30} round />
                </EmailShareButton>
            </div>
        </Menu>
    </>
}