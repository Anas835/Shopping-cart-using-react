import React from 'react';

const Cart = ({ cartItems, updateQuantity }) => {
  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <img src={`image/${item.image}`} alt={item.name} />
            <div>{item.name}</div>
            <div>{item.price.toLocaleString()}</div>
            <div>
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
