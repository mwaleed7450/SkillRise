// export default function Signup(){
//     return(
//         <div>
//             <h1>Welcome to the Signup Page</h1>
//         </div>
//     )
// }

import { useState } from "react";
import { Link } from "react-router";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log("Backend not running:", err));
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Sign Up</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>

        <p className="links">
          Have account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}