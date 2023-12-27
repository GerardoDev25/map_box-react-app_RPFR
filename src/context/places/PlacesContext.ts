import { createContext } from 'react';
import { Feature } from '../../interfaces';

export interface PlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];
  places: Feature[];
  isLoadingPlaces?: boolean;
  searchPlacesByTerm: (query: string) => Promise<Feature[]>;
}

export const PlacesContext = createContext({} as PlacesContextProps);
