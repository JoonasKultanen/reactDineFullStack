import React, { useState, useEffect } from "react";
import axios from "axios";
import Dish from "./Dish.jsx";
import "../css/Menu.css";

const Menu = ({ cart, setCart, handleUpdateQuantity, dishes, setDishes }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dishes");
        setDishes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch dishes:", error);
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="menu-container">
      <h1 className="menu-title">Menu</h1>
      {dishes.map((dish) => (
        <Dish
          key={dish.id}
          dish={dish}
          cart={cart}
          handleUpdateQuantity={handleUpdateQuantity}
        />
      ))}
    </div>
  );
};

export default Menu;
