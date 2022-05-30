import "tailwindcss/tailwind.css";
import initStripe from "stripe";

const Pricing = ({ objects }) => {
  return (
    <div className="bg-white h-screen">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {objects.map((object) => (
            <div key={object.id} className="group relative cursor-pointer">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-xl overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={object.images[0]}
                  alt={object.id}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>

              <div className="mt-4 flex justify-between py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <div>
                  <h3 className="ont-semibold text-2xl  text-black">
                    <a href={object.href}>
                      <span aria-hidden="true" className="absolute finset-0" />
                      {object.name}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {object.description}
                  </p>
                  <p className="text-xl mt-3 font-medium text-black">
                    {object.price / 100}€
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

  const { data: prices } = await stripe.prices.list({
    limit: 1,
  });

  const objects = await Promise.all(
    prices.map(async (price) => {
      const product = await stripe.products.retrieve(price.product);

      return {
        id: price.id,
        name: product.name,
        price: price.unit_amount,
        currency: price.currency,
        images: product.images,
        description: product.description,
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
