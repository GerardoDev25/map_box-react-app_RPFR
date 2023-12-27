import { useReducer, JSX, useContext, useEffect } from 'react';
import { Map, Marker, Popup } from 'mapbox-gl';
import { MapContext } from './MapContent';
import { mapReducer } from './mapReducer';
import { PlacesContext } from '..';

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());

    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [lng, lat] = place.center;

      const popup = new Popup().setHTML(`
        <h6>${place.text_es}</h6>
        <p>${place.place_name_es}</p> 
      `);

      const newMarker = new Marker({ color: '#61DAFB' })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(state.map!);

      newMarkers.push(newMarker);
    }

    // todo clear polyline
    dispatch({ type: '[Map] - setMarkers', payload: newMarkers });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

  const setMap = (map: Map) => {
    const myLocationPoup = new Popup().setHTML(`
    <h3>My location</h3>
    <p>on somewhere place in the world</p>
    `);

    new Marker({ color: '#61DAFB' })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPoup)
      .addTo(map);

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
