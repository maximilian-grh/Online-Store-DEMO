import initStripe from "stripe";

const Pricing = ({ objects }) => {
  return (
    <div className="w-full max-w-3xl mx-auto py-16 flex justify-around">
      {objects.map((object) => (
        <div key={object.id} className="w-80 h-40 rounded shadow px-6 py-4">
          <h2 className="text-xl">{object.image}</h2>
          <h2 className="text-xl">{object.name}</h2>
          <p className="text-gray-500">${object.price / 100}</p>
        </div>
      ))}
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
      };
    })
  );

  const sortedObjects = objects.sort((a, b) => a.price - b.price);

  return {
    props: {
      objects: sortedObjects,
    },
  };
};

export default Pricing;
