// src/App.js
import React from 'react';
import './themes.css';
import './global.css';
import { ThemeProvider } from './theme';
import ThemeSwitcher from './components/themeswitch';
import SamplePage from './components/samplepage';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <ThemeSwitcher />
        <SamplePage />
      </div>
    </ThemeProvider>
  );
}

export default App;