import React from "react";
import Link from "next/link";

import commerce from "../lib/commerce";
import CategoryList from "../components/Products/Category/CategoryList";
import ProductList from "../components/Products/ProductList";

export async function getStaticProps() {
  const { data: categories } = await commerce.categories.list();
  const { data: products } = await commerce.products.list();

  return {
    props: {
      categories,
      products,
    },
  };
}

export default function IndexPage({ categories, products }) {
  return (
    <div>
      <h3>
        <Link href="/categories">
          <a>Categories</a>
        </Link>
      </h3>

      <CategoryList categories={categories} />
      <ProductList products={products} />
    </div>
  );
}
