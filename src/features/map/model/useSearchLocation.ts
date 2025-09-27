import { useState, useCallback, RefObject } from 'react';
import MapView from 'react-native-maps';

export interface Coords {
  latitude: number;
  longitude: number;
}

// NOTE: 기본 줌 레벨
const DEFAULT_DELTA = 14;

// NOTE: 움직이는 속도(ms)
const MOVING_SPEED = 1000;

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
            zoom: DEFAULT_DELTA,
          },
          { duration: MOVING_SPEED },
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
