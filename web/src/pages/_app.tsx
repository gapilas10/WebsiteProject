import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import theme from "../theme";

function MyApp({ Component, pageProps }: any) {
  return (
    <StrictMode>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </StrictMode>
  );
}

export default MyApp;
