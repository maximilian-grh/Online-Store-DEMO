import "tailwindcss/tailwind.css";

import Layout from "../components/Layout";
import Hero from "../components/Hero";

import { commerce } from "../lib/commerce";
import ProductListing from "../components/ProductListing";

export async function getStaticProps() {
  const { data: products } = await commerce.products.list();

  return {
    props: {
      products,
    },
  };
}

const Home = ({ products }) => {
  return (
    <>
      <Layout>
        <Hero />
        <ProductListing products={products} />
      </Layout>
    </>
  );
};

export default Home;
