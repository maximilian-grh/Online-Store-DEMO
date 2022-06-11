import React from "react";

import commerce from "../../lib/commerce";
import { useCartDispatch } from "../../context/cartfunction";

export async function getStaticProps({ params }) {
  const { permalink } = params;

  const product = await commerce.products.retrieve(permalink, {
    type: "permalink",
  });

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const { data: products } = await commerce.products.list();

  return {
    paths: products.map((product) => ({
      params: {
        permalink: product.permalink,
      },
    })),
    fallback: false,
  };
}

export default function ProductPage({ product }) {
  const { setCart } = useCartDispatch();

  const addToCart = () =>
    commerce.cart.add(product.id).then(({ cart }) => setCart(cart));

  return (
    <div>
      <img src={product.image} alt={product.name} />
      <pre>{JSON.stringify(product, null, 2)}</pre>
      <h1>{product.name}</h1>
      <button
        onClick={addToCart}
        className="text-white bg-indigo-500 rounded-lg py-2 px-2"
      >
        Zum Warenkorb hinzufügen
      </button>
    </div>
  );
}
