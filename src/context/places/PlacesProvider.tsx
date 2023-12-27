import { JSX, useEffect, useReducer } from 'react';
import { PlacesContext } from './PlacesContext';
import { placesReducer } from './placesReducer';
import { getUserLocation } from '../../helpers';
import { searchApi } from '../../apis';
import { Feature, PlacesResponse } from '../../interfaces';

export interface PlacesState {
  isLoading: boolean;
  isLoadingPlaces?: boolean;
  userLocation?: [number, number];
  places: Feature[];
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  places: [],
  isLoadingPlaces: false,
};

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then((location) => {
      dispatch({ type: 'setUserLocation', payload: location });
    });
  }, []);

  const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
    if (query.length === 0) {
      dispatch({ type: 'setPlaces', payload: [] });
      return [];
    }
    if (!state.userLocation) throw new Error('there is not user location');

    dispatch({ type: 'setLoadingPlaces' });

    const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(','),
      },
    });

    dispatch({ type: 'setPlaces', payload: resp.data.features });
    return resp.data.features;
  };

  return (
    <PlacesContext.Provider
      value={{
        ...state,
        // method
        searchPlacesByTerm,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
