import React, { useState } from 'react';
import axios from 'axios';

import Cart from './components/Cart.jsx';
import Items from './components/Items.jsx';
import ItemDetail from './components/ItemDetail.jsx';
import Form from './components/Form.jsx';

export default function App() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedItemIndex, setSelectedItem] = useState();

  // [Update quantity] 1. When User clicks on "add to cart", check if the item already exists in cart
  const addToCart = (item, quantity) => {
    const cartItem = { quantity, ...item };

    // For every item in the cart, check if the name exists
    // cart = [ {quantity, name...}, {quantity, name...} ... ]
    let doesExist = false;
    cart.forEach((existingItem) => {
      if (item.name === existingItem.name) {
        // Get the hold of the existing item, add the new quantity to it
        existingItem.quantity += quantity;
        doesExist = true;
        setCart([...cart]);
      }
    });

    if (doesExist === false) {
      setCart([cartItem, ...cart]);
    }
  };

  const setItemDetail = (itemIndex) => {
    setSelectedItem(itemIndex);
  };

  const getItems = () => {
    axios.get('/items').then((result) => {
      // This retrieves the items from database to set as the UI
      setItems(result.data.items);
    });
  };

  // Sends info to db to create new row
  // Empty the cart
  const handleCheckout = () => {
    axios.post('/checkout', { cart }).then((result) => {
      console.log(result.data);
    });
  };

  const selectedItem = items[selectedItemIndex];

  return (
    <div className="container">
      <div className="row">
        <h1 className="page-title">Wow Shopping!</h1>
        {/* 4. We send the prop items & the function to our Form because all the items are in the parent component */}
        <Form items={items} setItems={setItems} />
        <Items items={items} setItemDetail={setItemDetail} />
        {/* Only display the buttons when there are no buttons on the screen (items.length === 0) */}
        {items.length === 0 && (
          <button type="button" onClick={getItems}>
            Get Items
          </button>
        )}
        <ItemDetail item={selectedItem} addToCart={addToCart} />
        <Cart items={cart} />
        {/* We have a condition to control when the Checkout button appears, which is after Cart is created */}
        {cart.length > 0 && (
          <button type="button" onClick={handleCheckout}>
            Check out
          </button>
        )}
      </div>
    </div>
  );
}
