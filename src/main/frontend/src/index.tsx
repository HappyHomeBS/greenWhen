import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthContextProvider } from './store/authContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Note.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthContextProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </AuthContextProvider>
);