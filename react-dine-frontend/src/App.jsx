import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/Home.jsx";
import MenuPage from "./components/Menu.jsx";
import ContactPage from "./components/Contact.jsx";
import Cart from "./components/Cart.jsx";
import CheckoutPage from "./components/CheckoutPage.jsx";
import Confirmation from "./components/Confirmation.jsx";
import { useState, useEffect } from "react";
import "./css/App.css";

function App() {
  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  };

  const [cart, setCart] = useState(loadCartFromLocalStorage());
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleUpdateQuantity = (dishId, operation) => {
    console.log(
      `handleUpdateQuantity called with dishId=${dishId} and operation=${operation}`
    );

    setCart((prevCart) => {
      const updatedCart = JSON.parse(JSON.stringify(prevCart));

      if (!updatedCart[dishId] && operation === "increase") {
        updatedCart[dishId] = {
          name: dishes.find((dish) => dish.id === dishId).name,
          price: parseFloat(dishes.find((dish) => dish.id === dishId).price),
          quantity: 1,
        };
      } else if (updatedCart[dishId] && operation === "increase") {
        updatedCart[dishId] = {
          ...updatedCart[dishId],
          quantity: updatedCart[dishId].quantity + 1,
        };
      } else if (
        updatedCart[dishId] &&
        operation === "decrease" &&
        updatedCart[dishId].quantity > 1
      ) {
        updatedCart[dishId] = {
          ...updatedCart[dishId],
          quantity: updatedCart[dishId].quantity - 1,
        };
      } else if (
        updatedCart[dishId] &&
        operation === "decrease" &&
        updatedCart[dishId].quantity === 1
      ) {
        delete updatedCart[dishId];
      }
      console.log("Updated cart:", updatedCart);
      return updatedCart;
    });
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <a href="/">
            <span className="navbar-logo">ReactDine</span>
          </a>
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
          <span className="navbar-cart-wrapper">
            <Link to="/cart" className="navbar-cart">
              <i className="fas fa-shopping-cart"></i>
              {Object.keys(cart).length > 0 && (
                <span className="navbar-cart-count">
                  {Object.values(cart).reduce(
                    (total, dish) => total + dish.quantity,
                    0
                  )}
                </span>
              )}
            </Link>
          </span>
        </nav>
        <Routes>
          <Route
            path="/menu"
            element={
              <MenuPage
                setCart={setCart}
                handleUpdateQuantity={handleUpdateQuantity}
                dishes={dishes}
                setDishes={setDishes}
                cart={cart}
              />
            }
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/cart"
            element={
              <Cart cart={cart} handleUpdateQuantity={handleUpdateQuantity} />
            }
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/confirmation" element={<Confirmation cart={cart} />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
