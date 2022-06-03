import type { NextPage } from "next";
import "tailwindcss/tailwind.css";

import Layout from "../components/Layout";
import Hero from "../components/Hero";
import InfoBanner from "../components/InfoBanner";

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <Hero />
      </Layout>
    </>
  );
};

export default Home;
