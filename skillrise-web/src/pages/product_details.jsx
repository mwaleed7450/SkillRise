// export default function ProductDetails(){
//     return(
//         <div>
//             <h1>Welcome to the Produtcs Detail Page</h1>
//         </div>
//     )
// }


import { useParams } from "react-router";
import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/products/" + id)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome to the Products Detail Page</h1>

      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}