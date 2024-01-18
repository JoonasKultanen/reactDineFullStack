import React from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>A Modern Take on Everyday Food</h1>
      <Link to="/menu">
        <button className="menu-btn">Check Menu</button>
      </Link>
    </div>
  );
};

export default Home;
