import React from "react";
import { Toaster } from "react-hot-toast";
import { StateContext } from "../context/StateContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

import { UserProvider } from "@auth0/nextjs-auth0";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <div>
        <SessionProvider session={session}>
          <UserProvider>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </UserProvider>
        </SessionProvider>
      </div>
    </>
  );
}

export default MyApp;
