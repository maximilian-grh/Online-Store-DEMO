import React from "react";

import commerce from "../lib/commerce";
import ProductList from "../components/Products/ProductList";

export async function getStaticProps() {
  const { data: products } = await commerce.products.list();

  return {
    props: {
      products,
    },
  };
}

export default function ProductsPage({ products }) {
  return (
    <div>
      <div className="text-2xl">Products</div>

      <ProductList products={products} />
    </div>
  );
}
