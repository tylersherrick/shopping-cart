import React, { useState } from "react";
import './App.css';

function ShoppingCart() {
  const availableItems = ["Apples", "Bananas", "Carrots", "Dates"];
  const [cart, setCart] = useState([]);
  const [selectedAvailableItems, setSelectedAvailableItems] = useState([]);
  const [selectedCartItems, setSelectedCartItems] = useState([]);

  const toggleAvailableItem = (index) => {
    if (selectedAvailableItems.includes(index)) {
      setSelectedAvailableItems(selectedAvailableItems.filter(i => i !== index));
    } else {
      setSelectedAvailableItems([...selectedAvailableItems, index]);
    }
  };

  const addToCart = () => {
    const itemsToAdd = selectedAvailableItems.map(i => availableItems[i]);
    setCart([...cart, ...itemsToAdd]);
    setSelectedAvailableItems([]);
  };

  const toggleCartItem = (index) => {
    if (selectedCartItems.includes(index)) {
      setSelectedCartItems(selectedCartItems.filter(i => i !== index));
    } else {
      setSelectedCartItems([...selectedCartItems, index]);
    }
  };

  const removeFromCart = () => {
    setCart(cart.filter((_, i) => !selectedCartItems.includes(i)));
    setSelectedCartItems([]);
  };

  return (
    <div className="shopping-container">
      <div className="cart">
        <h2>Cart {cart.length > 0 && `Items (${cart.length})`}</h2>
        <ul>
          {cart.map((item, index) => (
            <li className="cart-item" key={index}>
              <input
                type="checkbox"
                checked={selectedCartItems.includes(index)}
                onChange={() => toggleCartItem(index)}
              />
              {item}
            </li>
          ))}
        </ul>
        <button className="cart-button" onClick={removeFromCart} disabled={selectedCartItems.length === 0}>
          Remove from Cart
        </button>
      </div>
      <div className="available-items">
        <h2>Available Items</h2>
        <button onClick={addToCart} disabled={selectedAvailableItems.length === 0}>
          Add to Cart
        </button>
        <ul className="item-list">
          {availableItems.map((item, index) => (
            <li className="item" key={index}>
              <input
                type="checkbox"
                checked={selectedAvailableItems.includes(index)}
                onChange={() => toggleAvailableItem(index)}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


function ToDo() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [selectMode, setSelectMode] = useState(false);       // new state
  const [selectedTodos, setSelectedTodos] = useState([]);    // track selected indexes

  const handleAdd = () => {
    if(inputValue.trim() !== "") {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  }

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    setSelectedTodos([]);  // reset selections when toggling
  }

  const toggleSelectTodo = (index) => {
    if(selectedTodos.includes(index)) {
      setSelectedTodos(selectedTodos.filter(i => i !== index));
    } else {
      setSelectedTodos([...selectedTodos, index]);
    }
  }

  const handleDeleteSelected = () => {
    setTodos(todos.filter((_, i) => !selectedTodos.includes(i)));
    setSelectedTodos([]);
    setSelectMode(false);
  }

  return (
    <div className="content">
      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Enter a todo"
      />
      <p>Things to do: {todos.length}</p>
      <button onClick={handleAdd}>Add</button><br/><br/>

      {/* Select/Delete button */}
      {selectMode ? (
        <button onClick={handleDeleteSelected}>
          Delete ({selectedTodos.length})
        </button>
      ) : (
        <button onClick={toggleSelectMode}>Select</button>
      )}

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {/* Show checkbox only in select mode */}
            {selectMode && (
              <input
                type="checkbox"
                checked={selectedTodos.includes(index)}
                onChange={() => toggleSelectTodo(index)}
              />
            )}
            {todo}
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <ShoppingCart />
    </div>
  );
}

export default App;
