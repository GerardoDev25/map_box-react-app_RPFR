import { Map } from 'mapbox-gl';
import { createContext } from 'react';

interface MapContextProps {
  isMapReady: boolean;
  map?: Map;

  setMap: (map: Map) => void;
  getRouteBeweenPoints: (
    start: [number, number],
    end: [number, number]
  ) => Promise<void>;
}

export const MapContext = createContext({} as MapContextProps);
