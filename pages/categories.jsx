import React from "react";

import commerce from "../lib/commerce";
import CategoryList from "../components/Products/Category/CategoryList";

export async function getStaticProps() {
  const { data: categories } = await commerce.categories.list();

  return {
    props: {
      categories,
    },
  };
}

export default function CategoriesPage({ categories }) {
  return (
    <div>
      <div className="text-xl font-semibold">Categories</div>

      <CategoryList categories={categories} />
    </div>
  );
}
