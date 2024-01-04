import React, { useState } from 'react';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';
import productsData from './Data/Products.json'; // Assuming product data is stored in products.json

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      const updatedItems = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems.filter(item => item.quantity > 0));
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <div style={{ display: 'flex' }}>
        <ProductList products={productsData} addToCart={addToCart} />
        <Cart cartItems={cartItems} updateQuantity={updateQuantity} />
      </div>
    </div>
  );
};

export default App;
