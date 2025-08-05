import React, { useState } from 'react';
import ProductList from './components/prodlist';
import Cart from './components/cart';
import './App.css';

const initialProducts = [
  { id: 1, name: 'Camera', price: 999.99, image: 'https://i.pinimg.com/736x/e7/5d/db/e75ddbda351d44e24b6b8099fa200aad.jpg' },
  { id: 2, name: 'Phone', price: 789.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpE36ueITbnM5AjrOkSAilr7tZ1hAEw04BMA&s' },
  { id: 3, name: 'Watch', price: 109.99, image: 'https://m.media-amazon.com/images/I/616jllf33ZL._UY1000_.jpg' },
  { id: 4, name: 'Jeans', price: 59.99, image: 'https://m.media-amazon.com/images/I/91E69wClQ4L._UY1100_.jpg' },
];

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);
      
      if (existingItem.quantity > 1) {
        return prevItems.map((item) =>
          item.id === productId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      }
      
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  return (
    <div className="app">
      <header>
        <h1>Amazon</h1>
        <div className="cart-icon">Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</div>
      </header>
      <div className="main-content">
        <ProductList products={initialProducts} onAddToCart={addToCart} />
        <Cart cartItems={cartItems} onRemoveFromCart={removeFromCart} />
      </div>
    </div>
  );
}

export default App;