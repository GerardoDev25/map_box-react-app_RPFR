import axios from 'axios';

export const DirectionsApi = axios.create({
  baseURL: ' https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
    access_token:
      'pk.eyJ1IjoiZ215b2Rlc2Fycm9sbGFkb3IyMyIsImEiOiJjbHFmczg4N3ExMzF1MmtwbDNqZmNhc2V4In0.QIPd3sUgingBCXBoBzPOAw',
  },
});
