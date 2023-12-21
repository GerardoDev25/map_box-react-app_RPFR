import { Map } from 'mapbox-gl';
import { MapState } from './MapProvider';

type MapAction = { type: '[Map] - Set Map'; payload: Map };

export const mapReducer = (state: MapState, action: MapAction): MapState => {
  switch (action.type) {
    case '[Map] - Set Map':
      return { ...state };

    default:
      return { ...state };
  }
};
