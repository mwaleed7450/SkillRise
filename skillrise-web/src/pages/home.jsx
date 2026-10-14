// export default function Home(){
//     return(
//         <div>
//             <h1>Welcome to the Home Page</h1>
//         </div>
//     )
// }

import { useState } from "react";
import { Link } from "react-router";

export default function Home() {
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);

  return (
    <div className="page">
      <div className="card">
        <h1>Welcome to the Home Page</h1>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {name && <p>Hello, {name}!</p>}

        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>

        <p className="links">
          <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}