import "tailwindcss/tailwind.css";
import initStripe from "stripe";

const Pricing = ({ objects }) => {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Unsere Produkte
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <div className="w-full max-w-3xl mx-auto py-16 flex justify-around">
            {objects.map((object) => (
              <div
                key={object.id}
                className="hover:bg-gray-200 cursor-pointer w-80 h-40 rounded shadow px-6 py-4 group relative"
              >
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={object.images[0]}
                    alt={object.id}
                    class="h-auto w-auto"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <h2 className="text-xl">{object.name}</h2>
                  <p className="text-gray-500">${object.price / 100}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

  const { data: prices } = await stripe.prices.list();

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

  const sortedObjects = objects.sort((a, b) => a.price - b.price);

  return {
    props: {
      prices,
      objects: sortedObjects,
    },
  };
};

export default Pricing;
