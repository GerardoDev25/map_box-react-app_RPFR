import { useContext, useState } from 'react';
import { MapContext, PlacesContext } from '../context';
import { LoadingPlaces } from '.';
import { Feature } from '../interfaces';

export const SearchResult = () => {
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
  const { map, getRouteBeweenPoints } = useContext(MapContext);
  const [activeId, setActiveId] = useState('');

  const onPlaceClick = (place: Feature) => {
    const [lng, lat] = place.center;
    setActiveId(place.id);
    map?.flyTo({
      zoom: 14,
      center: [lng, lat],
    });
  };

  const getRoute = (place: Feature) => {
    if (!userLocation) return;

    const [lng, lat] = place.center;
    getRouteBeweenPoints(userLocation, [lng, lat]);
  };

  if (isLoadingPlaces) return <LoadingPlaces />;
  if (places.length === 0) return <></>;

  return (
    <ul className='list-group mt-3'>
      {places.map((place) => (
        <li
          key={place.id}
          className={`list-group-item list-group-item-action pointer ${
            activeId === place.id ? 'active' : ''
          }`}
          onClick={() => onPlaceClick(place)}
        >
          <h6>{place.text_es}</h6>
          <p
            className='text-muted'
            style={{
              fontSize: '12px',
            }}
          >
            {place.place_name}
          </p>
          <button
            className={`btn btn-sm${
              activeId === place.id
                ? 'btn-outline-light'
                : 'btn-outline-primary'
            }`}
            onClick={() => getRoute(place)}
          >
            Direcciones
          </button>
        </li>
      ))}
    </ul>
  );
};
