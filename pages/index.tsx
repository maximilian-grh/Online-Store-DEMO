import type { NextPage } from "next";
import "tailwindcss/tailwind.css";

import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Checkout from "./checkout";
import Feature from "../components/Feature";
import ProductFeature from "../components/ProductFeature";
import InfoBanner from "../components/InfoBanner";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <InfoBanner />
        <Hero />
        <Feature />
        <ProductFeature />
      </Layout>
    </>
  );
};

export default Home;
