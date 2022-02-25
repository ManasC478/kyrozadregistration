import { Box } from "@chakra-ui/react";

// imports
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Box bg={"#f8f8ff"}>
      <Navbar />
      <Box>{children}</Box>
      <Footer />
    </Box>
  );
};

export default Layout;
