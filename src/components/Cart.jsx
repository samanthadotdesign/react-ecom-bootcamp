import React, { useState } from "react";

export default function Cart({ items }) {
  return (
    <div>
      <h2>Cart</h2>
      {items.map((cartItem, index) => (
        <div key={cartItem.item.id}>
          {cartItem.item.name}:{cartItem.quantity}
        </div>
      ))}
      <div>
        <h3>Total: $100</h3>
      </div>
    </div>
  );
}
