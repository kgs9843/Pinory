import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

type PermissionStatus = 'granted' | 'denied' | 'undetermined';

const useLocationPermission = () => {
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('undetermined');

  // NOTE: 앱 실행 시 현재 권한 상태를 확인합니다.
  useEffect(() => {
    (async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      setPermissionStatus(status === 'granted' ? 'granted' : 'denied');
    })();
  }, []);

  const requestPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setPermissionStatus(status === 'granted' ? 'granted' : 'denied');
    return status === 'granted';
  };

  return { permissionStatus, requestPermission };
};

export default useLocationPermission;
