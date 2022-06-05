import React from "react";
import { useRouter } from "next/router";
import initStripe from "stripe";

const Product = ({ objects }) => {
  const router = useRouter();
  const { product } = router.query;
  console.log(product);
  return (
    <div className="bg-white h-screen">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-xl overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none"></div>
          <div className="text-red-500 text-3xl">{product}</div>
          <div className="text-red-500 text-3xl">{objects.id}</div>
          <form action="/api/checkout_session/" method="POST">
            <section>
              <button
                className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
                role="link"
              >
                Jetzt kaufen
              </button>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};
export const getStaticProps = async () => {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

  const { data: prices } = await stripe.prices.retrieve();

  const objects = await Promise.all(
    prices.map(async (price) => {
      const product = await stripe.products.retrieve(price.product);
      return {
        id: price.id,
        name: product.name,
        price: price.unit_amount,
        currency: price.currency,
        images: product.images,
      };
    })
  );

  return {
    props: {
      objects,
    },
  };
};
export async function getStaticPaths() {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

  const { data: prices } = await stripe.prices.list();
  return {
    paths: prices.map(async (price) => {
      const product = await stripe.products.retrieve(price.product);
      return {
        id: price.id,
        name: product.name,
        price: price.unit_amount,
        currency: price.currency,
        images: product.images,
      };
    }),
    fallback: false,
  };
}

export default Product;
