import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

import useLocationPermission from '@shared/lib/useLocationPermission';

interface LocationState {
  latitude: number;
  longitude: number;
}

const useLocation = (retryCount: number) => {
  const { permissionStatus, requestPermission } = useLocationPermission();
  const [location, setLocation] = useState<LocationState | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      if (permissionStatus === 'denied') {
        setLoading(false);
        // NOTE: 권한이 거부되었으면 즉시 종료
        setError('Location permission not granted.');
        return;
      }

      const hasPermission = await requestPermission();
      if (!hasPermission) {
        setLoading(false);
        // NOTE: 권한을 요청하고 승인되지 않았으면 종료
        setError('Location permission not granted.');
        return;
      }

      try {
        const currentLocation = await Location.getCurrentPositionAsync();

        // NOTE: 소수점 6자리까지
        const latitude = parseFloat(currentLocation.coords.latitude.toFixed(6));
        const longitude = parseFloat(currentLocation.coords.longitude.toFixed(6));

        setLocation(prev => {
          // NOTE: 이전 위치와 거의 같으면 업데이트하지 않음
          if (prev && prev.latitude === latitude && prev.longitude === longitude) {
            return prev;
          }
          return { latitude, longitude };
        });
      } catch (err) {
        setError('Could not get current location.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (permissionStatus === 'granted' || permissionStatus === 'undetermined') {
      fetchLocation();
    }
  }, [permissionStatus, requestPermission, retryCount]);

  return { location, loading, error };
};

export default useLocation;
