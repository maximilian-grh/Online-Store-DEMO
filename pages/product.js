import { commerce } from "../lib/commerce";
import ProductListing from "../components/ProductListing";

export async function getStaticProps() {
  const merchant = await commerce.merchants.about();
  const { data: products } = await commerce.products.list();

  return {
    props: {
      merchant,
      products,
    },
  };
}

const Index = ({ merchant, products }) => (
  <div>
    <Header merchant={merchant} />
    <Hero />
    <ProductListing products={products} />
  </div>
);

export default Index;
