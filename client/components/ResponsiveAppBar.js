import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import {Logo} from "./Logo";
import {AIAssistant} from "./appBar/AIAssistant";
import {GamifyProgressBar} from "./appBar/GamifyProgressBar";
import {SettingsMenu} from "./appBar/SettingsMenu";


function ResponsiveAppBar() {
  return (
    <AppBar position="static" className="bg-transparent shadow-none">
      <Container maxWidth="xl">
        <Toolbar disableGutters>a
          <Logo />
          <Box sx={{ flexGrow: 0, display: "flex", color: "#000" }}>
            <GamifyProgressBar />
            <AIAssistant />
            <SettingsMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
