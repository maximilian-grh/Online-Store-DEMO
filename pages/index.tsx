import type { NextPage } from "next";
import "tailwindcss/tailwind.css";

import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Feature from "../components/Feature";
import ProductFeature from "../components/ProductFeature";
import InfoBanner from "../components/InfoBanner";
import ProductFeed from "../components/ProductFeed";

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <InfoBanner />
        <Hero />
        <ProductFeed />
        <Feature />
        <ProductFeature />
      </Layout>
    </>
  );
};

export default Home;
