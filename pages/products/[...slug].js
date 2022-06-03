import React from "react";

const Product = () => {
  return (
    <div>
      [...slug].js
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
  );
};

export default Product;
