import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import { Alert } from 'react-native';

export const useGoogleLogin = () => {
  useEffect(() => {
    if (!process.env.EXPO_PUBLIC_FIREBASE_WEB_CLIENT_ID) {
      console.warn('EXPO_PUBLIC_FIREBASE_WEB_CLIENT_ID 환경변수 문제!');
    }
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_FIREBASE_WEB_CLIENT_ID,
    });
  }, []);

  // NOTE: 로그인
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

  // NOTE: 로그아웃
  const signOut = async () => {
    try {
      // NOTE: Google 계정 로그아웃
      await GoogleSignin.signOut();
      // NOTE: Firebase 로그아웃
      await auth().signOut();
    } catch (error) {
      console.error('🚨 로그아웃 오류:', error);
      Alert.alert('로그아웃 실패', '다시 시도해주세요.');
    }
  };

  // NOTE: 연결 해제 (언링크)
  const unlink = async () => {
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('로그인된 사용자가 없습니다.');

      // NOTE: Firebase 계정에서 Google 연결 해제
      await user.unlink('google.com');
      // NOTE: Google 계정 접근 권한 취소(탈퇴할때 사용)
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      Alert.alert('계정 연결 해제 완료', 'Google 계정 연결이 해제되었습니다.');
    } catch (error) {
      console.error('🚨 계정 연결 해제 오류:', error);
      Alert.alert('연결 해제 실패', 'Google 연결 해제 중 오류가 발생했습니다.');
    }
  };

  return { signIn, signOut, unlink };
};
