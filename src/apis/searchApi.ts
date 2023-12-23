import axios from 'axios';

export const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 5,
    language: 'es',
    access_token:
      'pk.eyJ1IjoiZ215b2Rlc2Fycm9sbGFkb3IyMyIsImEiOiJjbHFmczg4N3ExMzF1MmtwbDNqZmNhc2V4In0.QIPd3sUgingBCXBoBzPOAw',
  },
});
