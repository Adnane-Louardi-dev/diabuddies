import Container from "@mui/material/Container";
import ResponsiveAppBar from "../ResponsiveAppBar";


export const BlogLayout = ({children}) => {
  return <Container maxWidth={"xl"}>
            <ResponsiveAppBar />
            {children}
        </Container>
}