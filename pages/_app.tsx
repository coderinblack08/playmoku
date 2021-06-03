import "firebase/auth";
import type { AppProps } from "next/app";
import "../lib/firebase";
import { UserProvider } from "../lib/userContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
