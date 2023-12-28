import { useReducer, JSX, useContext, useEffect } from 'react';
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';
import { MapContext } from './MapContent';
import { mapReducer } from './mapReducer';
import { PlacesContext } from '..';
import { DirectionsApi } from '../../apis';
import { DirectionsResponse } from '../../interfaces/Directions';

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

  const getRouteBeweenPoints = async (
    start: [number, number],
    end: [number, number]
  ): Promise<void> => {
    const resp = await DirectionsApi.get<DirectionsResponse>(
      `/${start.join(',')};${end.join(',')}`
    );

    const { distance, duration, geometry } = resp.data.routes[0];

    const { coordinates: coords } = geometry;

    let kms = distance / 1000;
    kms = Math.round(kms * 100);
    kms /= 100;
    const minutes = Math.floor(duration / 60);
    console.log({ kms, minutes });

    const bounds = new LngLatBounds(start, start);

    for (const cord of coords) {
      const newCord: [number, number] = [cord[0], cord[1]];
      bounds.extend(newCord);
    }

    state.map?.fitBounds(bounds, { padding: 200 });

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
          },
        ],
      },
    };

    if (state.map?.getLayer('RouteString')) {
      state.map?.removeLayer('RouteString');
      state.map?.removeSource('RouteString');
    }

    state.map?.addSource('RouteString', sourceData);
    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'black',
        'line-width': 3,
      },
    });
  };

  return (
    <MapContext.Provider
      value={{
        ...state,
        // methods
        setMap,
        getRouteBeweenPoints,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
