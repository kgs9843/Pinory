import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

import useLocationPermission from '@shared/lib/useLocationPermission';

interface LocationState {
  latitude: number;
  longitude: number;
}

const useLocation = () => {
  const { permissionStatus, requestPermission } = useLocationPermission();
  const [location, setLocation] = useState<LocationState | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      if (permissionStatus === 'denied') {
        setLoading(false);
        // 권한이 거부되었으면 즉시 종료
        setError('Location permission not granted.');
        return;
      }

      const hasPermission = await requestPermission();
      if (!hasPermission) {
        setLoading(false);
        // 권한을 요청하고 승인되지 않았으면 종료
        setError('Location permission not granted.');
        return;
      }

      try {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
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
  }, [permissionStatus, requestPermission]);

  return { location, loading, error };
};

export default useLocation;
