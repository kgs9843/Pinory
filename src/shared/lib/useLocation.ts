import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

import useLocationPermission from '@shared/lib/useLocationPermission';
import { useLocationStore } from '@shared/store/useLocationStroe';

const ACCURACY = Location.Accuracy.Balanced; // NOTE: GPS 정확도
const DISTANCE_INTERVAL = 20; // NOTE: 몇 m 이동마다 업데이트
const THRESHOLD = 0.00005; // NOTE: 좌표 변화 허용 오차 (약 5m)

const useLocation = () => {
  const { permissionStatus, requestPermission } = useLocationPermission();
  const { location, setLocation, retryCount, setRetryCount } = useLocationStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    const startWatching = async () => {
      try {
        if (permissionStatus === 'denied') {
          throw new Error('Location permission not granted.');
        }

        const hasPermission = await requestPermission();
        if (!hasPermission) {
          throw new Error('Location permission not granted.');
        }

        subscription = await Location.watchPositionAsync(
          {
            accuracy: ACCURACY,
            distanceInterval: DISTANCE_INTERVAL,
          },
          loc => {
            const latitude = parseFloat(loc.coords.latitude.toFixed(6));
            const longitude = parseFloat(loc.coords.longitude.toFixed(6));
            const threshold = THRESHOLD;

            if (
              location &&
              Math.abs(location.latitude - latitude) < threshold &&
              Math.abs(location.longitude - longitude) < threshold
            ) {
              return;
            }

            setLocation({ latitude, longitude });
          },
        );
      } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Could not get current location.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (permissionStatus === 'granted' || permissionStatus === 'undetermined') {
      startWatching();
    }

    // NOTE: 언마운트 시 구독 제거 (GPS 계속 켜짐 방지)
    return () => {
      subscription?.remove();
    };
  }, [permissionStatus, requestPermission, retryCount]);

  return { location, loading, error, setRetryCount, retryCount };
};

export default useLocation;
