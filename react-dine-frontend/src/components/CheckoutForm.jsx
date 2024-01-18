import React, { useState } from "react";

const CheckoutForm = ({ onSubmit, cart }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  //const [instructions, setInstructions] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      name,
      email,
      street,
      postalCode,
      city,
      //instructions,
    };
    onSubmit({ ...formData, cart });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft: "20px",
      }}
    >
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label>Address:</label>
        <input
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label>Postal Code:</label>
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="form-input"
        />
      </div>
      {/*
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >

        <label>Special Instructions:</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="form-input"
          rows="4"
        ></textarea>
      </div>
      */}
      <button type="submit" className="normal">
        Next
      </button>
    </form>
  );
};

export default CheckoutForm;
