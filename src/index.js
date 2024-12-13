import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Routering } from './routes/routes.js';
import { AuthProvider } from './context/AuthContext.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Routering />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
