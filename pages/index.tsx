import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import "tailwindcss/tailwind.css";

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <Navbar />
        <Hero />
      </Layout>
    </>
  );
};

export default Home;
