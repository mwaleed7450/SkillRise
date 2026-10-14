// export default function Login(){
//     return(
//         <div>
//             <h1>Welcome to the Login Page</h1>
//         </div>
//     )
// }
import { useState } from "react";
import { Link } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log("Backend not running:", err));
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>

        <p className="links">
          No account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}