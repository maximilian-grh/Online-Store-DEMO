import { commerce } from "../../lib/commerce";
import Link from "next/link";

// This function gets called at build time on server-side.
export async function getStaticPaths() {
  const { data: products } = await commerce.products.list();

  return {
    // Get the paths we want to pre-render based on product
    // We pre-render only these paths at build time
    // params contains the product's `permalink`.
    // If the route is /product/book,
    // then params.permalink is `book`
    paths: products.map((product) => ({
      params: {
        permalink: product.permalink,
      },
    })),
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    fallback: false,
  };
}

// This function gets called at build time on server-side.
// Params contains route parameters for pages using dynamic route
export async function getStaticProps({ params }) {
  const { permalink } = params;
  // Call the Chec API endpoint to get products.
  // Retrieve product by permalink
  const product = await commerce.products.retrieve(permalink, {
    // Must include a type value
    type: "permalink",
  });

  // By returning { props: product }, the Product detail page component
  // will receive `product` as a prop at build time
  // Pass product data to the page via props
  return {
    props: {
      product,
    },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 60,
  };
}

const ProductDetailPage = ({ product }) => {
  return (
    // Add head tag
    <div className="product-detail">
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
      <button name="View item" className="product-detail__btn">
        <span>Add to cart</span>
      </button>
    </div>
  );
};

export default ProductDetailPage;
