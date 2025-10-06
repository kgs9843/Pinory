import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';
// import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

// NOTE: 스플래시 화면을 자동으로 숨기지 않도록 설정
SplashScreen.preventAutoHideAsync();

export default function useLoadedAssets() {
  // NOTE: 폰트 asset
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  // // NOTE: 비디오 asset
  // const [videosLoaded, setVideosLoaded] = useState(false);
  // useEffect(() => {
  //   const loadVideo = async () => {
  //     try {
  //       await Asset.fromModule(loginVideo).downloadAsync();
  //       setVideosLoaded(true);
  //     } catch (error) {
  //       console.warn('Video preload failed:', error);
  //       setVideosLoaded(true); // NOTE: 실패해도 앱 진행 가능
  //     }
  //   };
  //   loadVideo();
  // }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return { fontsLoaded, onLayoutRootView };
}
