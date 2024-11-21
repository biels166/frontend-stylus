import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { MiniDrawer } from './views/Home/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MiniDrawer />
  </React.StrictMode>
);

reportWebVitals();
