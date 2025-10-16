import firestore from '@react-native-firebase/firestore';

import { User } from '../model/type';

export const saveUserToFirestore = async (user: User) => {
  if (!user) return;

  const userDocument = firestore().collection('Users').doc(user.uid);

  try {
    const docSnap = await userDocument.get();

    if (!docSnap.exists()) {
      await userDocument.set({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        provider: user.provider,
        createdAt: firestore.FieldValue.serverTimestamp(),
        lastLoginAt: firestore.FieldValue.serverTimestamp(),
      });
      console.log('Firestore에 유저 저장 완료');
    } else {
      // NOTE: 기존 유저일 때: lastLoginAt만 갱신
      await userDocument.update({
        lastLoginAt: firestore.FieldValue.serverTimestamp(),
      });
      console.log('기존 유저 로그인 시간 갱신');
    }
  } catch (error) {
    console.error('Firestore 저장 오류:', error);
  }
};
