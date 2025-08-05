import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Counter App</h1>
        <div className="counter-container">
          <button className="counter-button" onClick={decrement}>-</button>
          <span className="counter-value">{count}</span>
          <button className="counter-button" onClick={increment}>+</button>
        </div>
        <button className="reset-button" onClick={reset}>Reset</button>
      </header>
    </div>
  );
}

export default App;