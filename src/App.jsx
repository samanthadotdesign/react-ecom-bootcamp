import React, { useState } from "react";
import axios from "axios";

import Cart from "./components/Cart.jsx";
import Items from "./components/Items.jsx";
import ItemDetail from "./components/ItemDetail.jsx";

export default function App() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedItemIndex, setSelectedItem] = useState();

  const addToCart = (item, quantity) => {
    setCart([{ item, quantity }, ...cart]);
  };

  const setItemDetail = (itemIndex) => {
    setSelectedItem(itemIndex);
  };

  const getItems = () => {
    axios.get("/items").then((result) => {
      console.log(result);
      setItems(result.data.items);
    });
  };

  const selectedItem = items[selectedItemIndex];

  return (
    <div>
      <Items items={items} setItemDetail={setItemDetail} />
      {items.length === 0 && (
        <button type="button" onClick={getItems}>
          Get Items
        </button>
      )}
      <ItemDetail item={selectedItem} addToCart={addToCart} />
      <Cart items={cart} />
    </div>
  );
}
