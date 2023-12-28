import axios from 'axios';
import { MAXBOX_KEY } from '../helpers';

export const DirectionsApi = axios.create({
  baseURL: ' https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
    access_token: MAXBOX_KEY,
  },
});
