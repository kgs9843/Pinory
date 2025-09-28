import { useCallback, RefObject } from 'react';
import MapView, { Region } from 'react-native-maps';

import { Coords } from '@shared/types';

// NOTE: 기본 줌 레벨 (delta 값)
const DEFAULT_DELTA = {
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

// NOTE: 움직이는 속도
const MOVING_SPEED = 200;

export function useMapControls(mapRef: RefObject<MapView | null>, currentLocation: Coords | null) {
  const goToCurrentLocation = useCallback(() => {
    if (mapRef.current && currentLocation) {
      const region: Region = {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: DEFAULT_DELTA.latitudeDelta,
        longitudeDelta: DEFAULT_DELTA.longitudeDelta,
      };
      mapRef.current.animateToRegion(region, MOVING_SPEED);
    }
  }, [mapRef, currentLocation]);

  return {
    goToCurrentLocation,
  };
}
