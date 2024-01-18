import React from "react";
import "../css/Dish.css";

const Dish = ({ dish, cart, handleUpdateQuantity }) => {
  const quantityInCart = cart && cart[dish.id] ? cart[dish.id].quantity : 0;

  const toggleButtonColor = (event) => {
    event.target.classList.toggle("clicked");
  };

  return (
    <div className="dish-card">
      <div className="dish-content">
        <img src={"http://localhost:5000/" + dish.image} alt={dish.name} />
        <div className="dish-text">
          <h2>{dish.name}</h2>
          <p>{dish.description}</p>
          <p>${dish.price}</p>
          <div className="dish-actions">
            <button
              onMouseDown={(event) => {
                handleUpdateQuantity(dish.id, "increase");
                toggleButtonColor(event);
              }}
              onMouseUp={toggleButtonColor}
              className="normal"
            >
              +
            </button>
            <button
              onMouseDown={(event) => {
                handleUpdateQuantity(dish.id, "decrease");
                toggleButtonColor(event);
              }}
              onMouseUp={toggleButtonColor}
              className="normal"
            >
              -
            </button>
            <span className="dish-quantity">{quantityInCart} in cart</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dish;
