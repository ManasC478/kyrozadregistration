import { Box } from "@chakra-ui/react";

// imports
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <Box maxW={"1200px"} mx={"auto"}>
      <Navbar />
      {children}
    </Box>
  );
};

export default Layout;
