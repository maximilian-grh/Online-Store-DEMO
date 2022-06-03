import initStripe from "stripe";
import Image from 'next/image'

const Pricing = ({ objects }) => {
  return (
    <div className="bg-white h-screen pb-10">
      <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:max-w-7xl">
        <div className="mt-6">
          {objects.map((object) => (
            <div key={object.id} className="sm:flex flex-col-2 m-4">
              <div className="w-full aspect-w-1 aspect-h-1 overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <Image
                  src={object.images[0]}
                  alt={object.id}
                  className="h-full rounded-xl object-center justify-center object-cover"
                />
              </div>

              <div className="mt-4 flex w-full md:justify-end lg:justify-end sm:justify-start py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:pr-8">
                <div>
                  <h3 className="font-semibold text-2xl  text-black">
                    <a href={object.href}>
                      <span aria-hidden="true" className="finset-0" />
                      {object.name}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {object.description}
                  </p>
                  <p className="text-xl mt-3 font-medium text-black">
                    {object.price / 100}€
                  </p>
                  <form action="/api/checkout_session" method="POST">
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
