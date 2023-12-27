import { Map, Marker } from 'mapbox-gl';
import { MapState } from './MapProvider';

type MapAction =
  | { type: '[Map] - Set Map'; payload: Map }
  | { type: '[Map] - setMarkers'; payload: Marker[] };

export const mapReducer = (state: MapState, action: MapAction): MapState => {
  switch (action.type) {
    case '[Map] - Set Map':
      return { ...state, isMapReady: true, map: action.payload };
    case '[Map] - setMarkers':
      return {
        ...state,
        markers: action.payload,
      };

    default:
      return { ...state };
  }
};
