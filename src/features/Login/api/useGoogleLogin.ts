import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import { Alert } from 'react-native';

export const useGoogleLogin = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_FIREBASE_WEB_CLIENT_ID,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;

      if (!idToken) {
        Alert.alert('로그인 실패', 'idToken을 가져올 수 없습니다.');
        return;
      }

      console.log(idToken);

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const res = await auth().signInWithCredential(googleCredential);

      console.log(res);

      if (!idToken) {
        Alert.alert('로그인 실패', 'idToken을 가져올 수 없습니다.');
        return null;
      }

      return userInfo;
    } catch (error: unknown) {
      let message = '알 수 없는 오류가 발생했습니다.';
      if (error instanceof Error) {
        message = error.message;
      }
      console.error('🚨 Google 로그인 오류:', message);
      Alert.alert('로그인 오류', message);
      return null;
    }
  };

  return { signIn };
};
