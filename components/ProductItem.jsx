const ProductItem = ({ product }) => {
  return (
    <div className="product">
      <img
        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        src={product.media}
        alt={product.name}
        height="50px"
      />
      <div className="product__info">
        <h2 className="product__name">Shop {product.name}</h2>
      </div>
    </div>
  );
};

export default ProductItem;
