import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import {Logo} from "./Logo";
import {AIAssistant} from "../appBar/AIAssistant";
import {SettingsMenu} from "../appBar/SettingsMenu";
import LanguageSwitcher from "../appBar/LanguageSwitcher";
import {Footer} from "./Footer";
import {useGetCurrentUser} from "../../customeHooks/useGetCurrentUser";
import {Button} from "@mui/material";
import Link from "next/link";

function ResponsiveAppBar() {
    const {user, isLoading} = useGetCurrentUser()
  return (
      <>
        <AppBar position="static" className="bg-transparent shadow-none" dir={"ltr"}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Logo />
              <Box sx={{ flexGrow: 0, display: "flex", color: "#000" }}>
                  {user || isLoading ? <>
                      <AIAssistant/>
                      <SettingsMenu />
                  </> : <Link href={"/login"} passHref>
                      <Button className={"bg-diaBlue text-white"}>
                          Log In
                      </Button>
                  </Link>}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Footer />
      </>
  );
}
export default ResponsiveAppBar;
