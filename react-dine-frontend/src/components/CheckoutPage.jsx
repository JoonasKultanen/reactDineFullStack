import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import "../css/CheckoutPage.css";

const CheckoutPage = () => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  console.log("cart in CheckoutPage:", cart);

  const handleOrderConfirmation = (orderData) => {
    setOrderConfirmed(true);
    const { cart, ...checkoutInputs } = orderData;
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("checkoutInputs", JSON.stringify(checkoutInputs));
    navigate("/confirmation");
  };

  return (
    <div className="checkout">
      <h1 className="checkout-title">Delivery</h1>
      <div className="form-container">
        <CheckoutForm onSubmit={handleOrderConfirmation} cart={cart} />
      </div>
    </div>
  );
};

export default CheckoutPage;
