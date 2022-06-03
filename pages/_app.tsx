import React from "react";
import type { AppProps } from "next/app";

import "tailwindcss/tailwind.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InfoBanner from "../components/InfoBanner";

import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <UserProvider>
        <InfoBanner />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </UserProvider>
    </>
  );
}

export default MyApp;
