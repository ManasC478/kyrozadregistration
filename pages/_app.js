// import provider from next-auth
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";

// component imports
import Layout from "../components/Layout";
import React from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <React.StrictMode>
      <ChakraProvider>
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </ChakraProvider>
    </React.StrictMode>
  );
}

export default MyApp;
