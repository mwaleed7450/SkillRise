import { useState } from "react";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: Number(price), description }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage("Product added! id: " + data._id);
        setName("");
        setPrice("");
        setDescription("");
      })
      .catch((err) => console.log("Backend not running:", err));
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Add Product</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Add Product</button>
        </form>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}