import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

// NOTE: 스플래시 화면을 자동으로 숨기지 않도록 설정
SplashScreen.preventAutoHideAsync();

export default function useLoadedAssets() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // NOTE: 폰트 로드가 완료되면 스플래시 화면을 숨깁니다.
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return { fontsLoaded, onLayoutRootView };
}
