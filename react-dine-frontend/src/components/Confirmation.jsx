import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Confirmation.css";

const ConfirmationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const checkoutInputs =
    JSON.parse(localStorage.getItem("checkoutInputs")) || {};

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleConfirm = () => {
    setIsLoading(true);
    const orderData = {
      order: {
        customer: checkoutInputs,
        items: Object.entries(cart).map(([key, value]) => ({
          id: key,
          quantity: value.quantity,
        })),
      },
    };

    console.log(orderData);

    fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Order confirmed");
        localStorage.removeItem("cart");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to confirm order");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="confirmation">
      <h1>Order Details</h1>
      <div className="cart-section">
        {cart &&
          Object.entries(cart).map(([key, value]) => (
            <div key={key} className="cart-item">
              <h2 className="item-name">{value.name}</h2>
              <p className="item-price">Price: ${value.price}</p>
              <p className="item-quantity">Quantity: {value.quantity}</p>
            </div>
          ))}
      </div>
      <div className="checkout-section">
        {checkoutInputs &&
          Object.entries(checkoutInputs).map(([key, value]) => (
            <div key={key}>
              <p>
                {capitalizeFirstLetter(key)}: {value}
              </p>
            </div>
          ))}
      </div>
      <button onClick={handleConfirm} className="normal" disabled={isLoading}>
        {isLoading ? "Processing..." : "Confirm"}
      </button>
    </div>
  );
};

export default ConfirmationPage;
