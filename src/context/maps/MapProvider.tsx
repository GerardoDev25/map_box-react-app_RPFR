import { useReducer, JSX } from 'react';
import { Map } from 'mapbox-gl';
import { MapContext } from './MapContent';
import { mapReducer } from './mapReducer';

export interface MapState {
  isMapReady: boolean;
  map?: Map;
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

  const setMap = (map: Map) => {
    dispatch({ type: '[Map] - Set Map', payload: map });
  };

  return (
    <MapContext.Provider
      value={{
        ...state,
        // methods
        setMap,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
