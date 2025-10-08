import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCw27mH4B_isL7ZHomLOeunk1OsNQ0RNoA',
  authDomain: 'pinory-cdc31.firebaseapp.com',
  projectId: 'pinory-cdc31',
  storageBucket: 'pinory-cdc31.firebasestorage.app',
  messagingSenderId: '1061249723271',
  appId: '1:1061249723271:web:21860921657fe8f9318122',
  measurementId: 'G-KV3C702R5L',
};

// NOTE: Firebase 초기화
const app = initializeApp(firebaseConfig);

// NOTE: Firebase Auth 초기화 + AsyncStorage 기반 세션 유지
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default app;
