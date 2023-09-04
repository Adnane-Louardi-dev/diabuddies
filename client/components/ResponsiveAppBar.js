import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import {Logo} from "./Logo";
import {AIAssistant} from "./appBar/AIAssistant";
import {SettingsMenu} from "./appBar/SettingsMenu";
import LanguageSwitcher from "./appBar/LanguageSwitcher";

function ResponsiveAppBar() {
  return (
    <AppBar position="static" className="bg-transparent shadow-none" dir={"ltr"}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <Box sx={{ flexGrow: 0, display: "flex", color: "#000" }}>
            <AIAssistant />
            <SettingsMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
