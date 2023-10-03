import Navbar from "./navbar";
import Container from "@mui/material/Container";
import {Footer} from "../layout/Footer";


export const StoreLayout = ({children}) => {
  return <Container maxWidth={"xl"}>
            <Navbar />
            {children}
            <Footer />
        </Container>
}