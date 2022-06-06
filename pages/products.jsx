import { commerce } from "../lib/commerce";
import ProductListing from "../components/ProductListing";

export async function getStaticProps() {
  const { data: categories } = await commerce.categories.list();
  const { data: products } = await commerce.products.list();

  return {
    props: {
      products,
      categories,
    },
  };
}

const Index = ({ products, categories }) => (
  <div>
    <ProductListing products={products} />
    <pre>{JSON.stringify(products, null, 2)}</pre>
    <pre>{JSON.stringify(categories, null, 2)}</pre>
  </div>
);

export default Index;
