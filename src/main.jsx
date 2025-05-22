import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import PlayerContextProvider from './context/PlayerContext.jsx';
import { SongProvider } from './context/Song.jsx'; 
import { UserProvider } from './context/User.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PlayerContextProvider>
        <UserProvider>
          <SongProvider> 
            <App />
          </SongProvider>
        </UserProvider>
        
      </PlayerContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
