import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import AuthProvider from './store/AuthProvider';
import MessagingProvider from './store/MessagingProvider';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <MessagingProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MessagingProvider>
  </BrowserRouter>,
  // </React.StrictMode>,
);
