import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import { GameControlsProvider } from './contexts/GameControlsContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GameControlsProvider>
     <App />
    </GameControlsProvider>
  </BrowserRouter>
);