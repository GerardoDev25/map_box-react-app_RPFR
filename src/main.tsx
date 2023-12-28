import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapsApp } from './MpasApp';

if (!navigator.geolocation) {
  alert("your browser don't have to Geolocation");
  throw new Error("your browser don't have to Geolocation");
}

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { MAXBOX_KEY } from './helpers';

mapboxgl.accessToken = MAXBOX_KEY;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);
