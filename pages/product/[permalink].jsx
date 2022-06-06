import { commerce } from "../../lib/commerce";
import Link from "next/link";
import { useCartDispatch } from "../../context/cart";

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

export async function getStaticProps({ params }) {
  const { permalink } = params;
  const product = await commerce.products.retrieve(permalink, {
    type: "permalink",
  });
  return {
    props: {
      product,
    },
    revalidate: 60,
  };
}

const ProductDetailPage = ({ product }) => {
  const { setCart } = useCartDispatch();
  const addToCart = () =>
    commerce.cart.add(product.id).then(({ cart }) => setCart(cart));

  return (
    <div className="w-full">
      <img
        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        src={product.media}
        alt={product.name}
      />
      <div className="product-detail__info">
        <Link href="/">
          <a className="product-detail__back">
            <p>Back to products</p>
          </a>
        </Link>
        <div className="product-detail__details">
          <h1 className="product-detail__name">{product.name}</h1>
          <div
            className="product-detail__description"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
          <div className="product-detail__price">
            {product.price.formatted_with_symbol}
          </div>
        </div>
      </div>
      <button
        onClick={addToCart}
        className="bg-indigo-500 rounded-lg px-6 py-2 text-white"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetailPage;
