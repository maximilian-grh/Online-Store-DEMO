import React from "react";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";

import Navbar from "../components/Main/Navbar";
import Footer from "../components/Main/Footer";
import InfoBanner from "../components/Sections/InfoBanner";

import { CartProvider } from "../context/cartfunction";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <CartProvider>
        <UserProvider>
          <InfoBanner />
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </UserProvider>
      </CartProvider>
    </>
  );
}

export default MyApp;
