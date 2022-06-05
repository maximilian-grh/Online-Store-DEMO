const ProductItem = ({ product }) => {
  return (
    <div className="product">
      <div className="product__info">
        <h2 className="product__name">Shop {product.name}</h2>
      </div>
    </div>
  );
};

export default ProductItem;
