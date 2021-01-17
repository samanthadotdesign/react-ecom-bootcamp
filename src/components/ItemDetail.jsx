import React, { useState } from "react";

export default function ItemDetail({ item, addToCart }) {
  const [quantity, setQuantity] = useState(0);

  if (!item) {
    return (
      <div>
        <p>detail</p>
      </div>
    );
  }

  const handleSelectChange = (event) => {
    setQuantity(event.target.value);
  };

  const detailAddCart = () => {
    addToCart(item, quantity);
  };

  return (
    <div>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p>
        <select value={quantity} onChange={handleSelectChange}>
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <option value={index + 1}>{index + 1}</option>
            ))}
        </select>
        <button type="button" onClick={detailAddCart}>
          Add To Cart
        </button>
      </p>
    </div>
  );
}
