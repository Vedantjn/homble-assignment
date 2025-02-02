import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import "./App.css";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <Router> 
      <div className="App">
        <AppRouter />
      </div>
    </Router>
  );
}

export default App;
