import { useCallback, RefObject } from 'react';
import MapView, { Region } from 'react-native-maps';

import { useLocationStore } from '@shared/store/useLocationStroe';

// NOTE: 기본 줌 레벨 (delta 값)
const DEFAULT_DELTA = {
  latitudeDelta: 0.003,
  longitudeDelta: 0.003,
};

// NOTE: 움직이는 속도
const MOVING_SPEED = 200;

export function useMapControls(mapRef: RefObject<MapView | null>) {
  const { location } = useLocationStore();
  const goToCurrentLocation = useCallback(() => {
    if (mapRef.current && location) {
      const region: Region = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: DEFAULT_DELTA.latitudeDelta,
        longitudeDelta: DEFAULT_DELTA.longitudeDelta,
      };
      mapRef.current.animateToRegion(region, MOVING_SPEED);
    }
  }, [mapRef, location]);

  return {
    goToCurrentLocation,
  };
}
