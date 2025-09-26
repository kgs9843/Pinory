import { useState, useCallback, RefObject } from 'react';
import MapView from 'react-native-maps';

export interface Coords {
  latitude: number;
  longitude: number;
}

export function useSearchLocation(mapRef: RefObject<MapView | null>) {
  const [searchLocation, setSearchLocation] = useState<Coords | null>(null);

  const handleSearch = useCallback(
    (coords: Coords) => {
      setSearchLocation(coords);

      if (mapRef.current) {
        mapRef.current.animateCamera(
          {
            center: {
              latitude: coords.latitude,
              longitude: coords.longitude,
            },
            zoom: 14,
          },
          { duration: 1000 },
        );
      }
    },
    [mapRef],
  );

  return {
    searchLocation,
    handleSearch,
  };
}
