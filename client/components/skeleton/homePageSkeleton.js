import { Logo } from "../layout/Logo";
import Container from "@mui/material/Container";
import { LogoLoading } from "../layout/LogoLoading";

export const HomePageSkeleton = () => (
  <Container maxWidth={"xl"} className={"relative w-screen h-[100vh]"}>
    <div role={"status"}>
      <div className={"absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"}>
        <LogoLoading />
      </div>
    </div>
  </Container>
);
