import { JSX, useEffect, useReducer } from 'react';
import { PlacesContext } from './PlacesContext';
import { placesReducer } from './placesReducer';
import { getUserLocation } from '../../helpers';
import { searchApi } from '../../apis';

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
};

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then((location) => {
      dispatch({ type: 'setUserLocation', payload: location });
    });
  }, []);

  const searchPlacesByTerm = async (query: string) => {
    if (query.length === 0) return [];
    if (!state.userLocation) throw new Error('no hay user location');

    const resp = await searchApi.get(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(','),
      },
    });

    console.log(resp.data);
    return resp.data;
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
