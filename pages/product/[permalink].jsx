import React, { Component } from "react";
import { stripHtml } from "string-strip-html";
import PropTypes from "prop-types";

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

const ProductPage = ({ product }) => {
  const { result } = stripHtml(product.description);
  const { setCart } = useCartDispatch();
  const addToCart = () =>
    commerce.cart.add(product.id).then(({ cart }) => setCart(cart));

  return (
    <div className="w-full">
      <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
        <div className="hidden rounded-lg overflow-hidden lg:block">
          <img
            className="rounded-lg w-full h-full object-center object-cover"
            src={product.image?.url}
            alt={product.name}
          />
        </div>
        <div className="flex-col-2">
          <div className="text-md text-gray-600">{product.sku}</div>
          <div className="text-2xl font-semibold mb-4">{product.name}</div>
          <div className="text-gray-600 text-md mb-6">{result}</div>

          <div className="text-2xl font-semibold mb-4">
            {product.product_id}
          </div>
          <div className="text-2xl">{product.price.formatted_with_symbol}</div>
          <div className="text-md mt-2 mb-2 text-gray-600">
            Noch {product.inventory.available} Stück verfügbar
          </div>
          <button
            onClick={addToCart}
            className="text-white bg-indigo-500 rounded-lg py-3 px-6"
          >
            Zum Warenkorb hinzufügen
          </button>
        </div>
      </div>
    </div>
  );
};

ProductPage.propTypes = {
  product: PropTypes.object,
};

export default ProductPage;
