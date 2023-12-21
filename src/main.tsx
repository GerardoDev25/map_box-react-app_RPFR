import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapsApp } from './MpasApp';

if (!navigator.geolocation) {
  alert("your browser don't have to Geolocation");
  throw new Error("your browser don't have to Geolocation");
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);
