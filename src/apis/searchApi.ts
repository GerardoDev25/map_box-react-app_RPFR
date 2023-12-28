import axios from 'axios';
import { MAXBOX_KEY } from '../helpers';

export const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 5,
    language: 'es',
    access_token: MAXBOX_KEY,
  },
});
