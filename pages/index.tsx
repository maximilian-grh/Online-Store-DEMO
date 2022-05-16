import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import "tailwindcss/tailwind.css";
import Checkout from "./Checkout";

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <Navbar />
        <Hero />
        <Checkout />
      </Layout>
    </>
  );
};

export default Home;
