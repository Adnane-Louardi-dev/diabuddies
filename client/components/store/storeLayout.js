import Navbar from "./navbar";
import Container from "@mui/material/Container";


export const StoreLayout = ({children}) => {
  return <Container maxWidth={"xl"}>
            <Navbar />
            {children}
        </Container>
}