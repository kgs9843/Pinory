import { useCallback, RefObject } from 'react';
import MapView, { Region } from 'react-native-maps';

interface Coords {
  latitude: number;
  longitude: number;
}

export function useMapControls(mapRef: RefObject<MapView | null>, currentLocation: Coords | null) {
  const goToCurrentLocation = useCallback(() => {
    if (mapRef.current && currentLocation) {
      const region: Region = {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.current.animateToRegion(region, 500);
    }
  }, [mapRef, currentLocation]);

  return {
    goToCurrentLocation,
  };
}
