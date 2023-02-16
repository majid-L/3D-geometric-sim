import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { HashRouter } from 'react-router-dom';
import { GameControlsProvider } from './contexts/GameControlsContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <HashRouter>
    <GameControlsProvider>
     <App />
    </GameControlsProvider>
    </HashRouter>,
);