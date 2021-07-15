import React, { useState } from 'react';
import axios from 'axios';

// items that we pass into Form as an arg is a list
// props by default inside the component arg is an object
// that's why we destructure { items, setItems } so we can use it as just items
export default function Form({ items, setItems }) {
  // 2.0 Create states
  const [nameInput, setNameInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [priceInput, setPriceInput] = useState(0);

  // 2.1 Create event handlers
  const handleName = (e) => {
    // This changes the var nameInput to whatever user passes in
    setNameInput(e.target.value);
  };

  const handleDescription = (e) => {
    setDescriptionInput(e.target.value);
  };

  const handlePrice = (e) => {
    setPriceInput(e.target.value);
  };

  // 3. We added a new app.post route and initItemsController
  const handleSubmit = () => {
    // Updates the database
    axios.post('/update', { nameInput, descriptionInput, priceInput }).then(
      // Update the state of items so that new item shows up
      // 5. Result holds the value of the new item that is added to database
      (result) => {
        // 6. Ensures that we get the most updated version of items in the UI
        setItems([...items, result.data]);
      },
    );
  };

  return (
    // 1. Create frontend form
    <div>
      <input placeholder="Name" type="text" value={nameInput} onChange={handleName} />
      <textarea placeholder="Description" type="text" value={descriptionInput} onChange={handleDescription} />
      <input placeholder="Price" type="number" value={priceInput} onChange={handlePrice} />
      <button type="submit" onClick={handleSubmit}>Add Item</button>
    </div>
  );
}
