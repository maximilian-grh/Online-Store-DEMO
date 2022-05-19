import React from "react";
import { Toaster } from "react-hot-toast";
import { StateContext } from "../context/StateContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { AppProps } from "next/app";

import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <>
      <div>
        <UserProvider>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </UserProvider>
      </div>
    </>
  );
}

export default MyApp;
