import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Cart.css";

const Cart = ({ cart, handleUpdateQuantity }) => {
  const navigate = useNavigate();

  const totalPrice = Object.values(cart).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const toggleButtonColor = (event) => {
    event.target.classList.toggle("clicked");
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart">
      <h1 className="cart-title">Your Cart</h1>
      {Object.entries(cart).map(([key, value]) => (
        <div key={key} className="cart-item">
          <h2 className="item-name">{value.name}</h2>
          <p className="item-price">Price: ${value.price}</p>
          <p className="item-quantity">Quantity: {value.quantity}</p>
          <div className="cart-item-actions">
            <button
              onMouseDown={(event) => {
                handleUpdateQuantity(key, "increase");
                toggleButtonColor(event);
              }}
              onMouseUp={toggleButtonColor}
              className="normal"
            >
              +
            </button>
            <button
              onMouseDown={(event) => {
                handleUpdateQuantity(key, "decrease");
                toggleButtonColor(event);
              }}
              onMouseUp={toggleButtonColor}
              className="normal"
            >
              -
            </button>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <h2>Total: ${totalPrice}</h2>
        <button onClick={handleCheckout} className="normal">
          Next
        </button>
      </div>
    </div>
  );
};

export default Cart;
