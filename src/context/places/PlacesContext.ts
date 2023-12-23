import { createContext } from 'react';

export interface PlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchPlacesByTerm: (query: string) => Promise<any>
}

export const PlacesContext = createContext({} as PlacesContextProps);
