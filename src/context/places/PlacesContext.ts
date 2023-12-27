import { createContext } from 'react';
import { Feature } from '../../interfaces';

export interface PlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchPlacesByTerm: (query: string) => Promise<Feature[]>;
}

export const PlacesContext = createContext({} as PlacesContextProps);
