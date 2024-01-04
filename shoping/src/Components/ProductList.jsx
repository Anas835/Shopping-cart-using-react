import React from 'react';
import productsData from '../Data/Products.json';

const ProductList = ({ addToCart }) => {
  const getImagePath = (productId) => {
    return require(`../image/${productId}.jpg`).default;
  };

  return (
    <div>
      {productsData.map(product => (
        <div key={product.id}>
          <img src={getImagePath(product.id)} alt={product.name} />
          <div>{product.name}</div>
          <div>{product.price.toLocaleString()}</div>
          <button onClick={() => addToCart(product)}>Add To Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
