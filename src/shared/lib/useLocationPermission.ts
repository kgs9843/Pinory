import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

type PermissionStatus = 'granted' | 'denied' | 'undetermined';

const useLocationPermission = () => {
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('undetermined');

  // NOTE: 권한 상태를 확인하는 재사용 가능한 함수
  const checkPermissionStatus = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    setPermissionStatus(status as PermissionStatus);
  };

  // NOTE: 앱 실행 시 현재 권한 상태를 확인합니다.
  useEffect(() => {
    // NOTE: 컴포넌트 마운트 시 최초 확인
    checkPermissionStatus();

    // NOTE: AppState 리스너 등록: 앱이 포그라운드로 돌아올 때를 감지
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        checkPermissionStatus();
      }
    };

    // NOTE: 리스너 등록 및 구독
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  const requestPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setPermissionStatus(status === 'granted' ? 'granted' : 'denied');
    return status === 'granted';
  };

  return { permissionStatus, requestPermission };
};

export default useLocationPermission;
