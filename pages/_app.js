// import provider from next-auth
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { UserContextProvider } from "../lib/CustomHooks/useUser";
import customTheme from "../styles/theme";

// component imports
import Layout from "../components/Layout";
import React from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <React.StrictMode>
      <ChakraProvider theme={customTheme}>
        <SessionProvider session={session}>
          <UserContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserContextProvider>
        </SessionProvider>
      </ChakraProvider>
    </React.StrictMode>
  );
}

export default MyApp;
