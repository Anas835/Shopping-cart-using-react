import React, { useState, useEffect } from 'react';
import './ProductList.css'; // Add or adjust CSS for other styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false); // State to manage cart visibility
  const [searchTerm, setSearchTerm] = useState(''); // State to hold search term

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const getFilteredProducts = () => {
    const searchTerms = searchTerm.split(',').map((term) => term.trim().toLowerCase());
    if (searchTerms.length === 1 && !searchTerms[0]) {
      return products;
    }
    return products.filter((product) =>
      searchTerms.some((term) => product.name.toLowerCase().includes(term))
    );
  };
  const filteredProducts = getFilteredProducts();
  return (
    <div className="container mt-4">
      <h1>Product List</h1>
      <input
        type="text"
        placeholder="Search products by name..."
        value={searchTerm}
        onChange={handleSearch}
        className="form-control-lg" 
        style={{ width: '50%', margin: 'auto' }}
      />
      <button className="btn btn-primary ml-4" onClick={toggleCart} style={{ width: '10%',height:'45px', margin: 'auto' }}>Cart</button> 
      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-md-3 mt-3" key={product.id}>
            <div className="card">
              <img className="card-img-top" src={`http://localhost:5000${product.image}`} alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ${product.price}</p>
                <button className="btn btn-success" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showCart && (
        <div className="cart-overlay">
          <div className="cart">
            <button  id='c' className="btn btn-primary ml-4" onClick={toggleCart}>Cart</button> 
            <h2>Shopping Cart</h2>
            <ul className="list-group">
              {cartItems.map((item) => (
                <li className="list-group-item" key={item.id}>
                  <div className="row">
                    <div className="col-md-3">
                      <img src={`http://localhost:5000${item.image}`} alt={item.name} className="img-fluid" />
                    </div>
                    <div className="col-md-9">
                      <h5>{item.name}</h5>
                      <p>Quantity: {item.quantity}</p>
                      <p>Item Price: ${item.price * item.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <h3>Total Price: ${getTotalPrice()}</h3> 
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductList;