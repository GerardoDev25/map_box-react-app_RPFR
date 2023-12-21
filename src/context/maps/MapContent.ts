import { Map } from 'mapbox-gl';
import { createContext } from 'react';

interface MapContextProps {
  isMapReady: boolean;
  map?: Map;

  // setMapReady: (value: boolean) => void;
}

export const MapContext = createContext({} as MapContextProps);
