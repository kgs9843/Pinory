import firestore from '@react-native-firebase/firestore';

import { FirebaseUser } from '@/src/entities/user/model/userType';

export const saveUserToFirestore = async (user: FirebaseUser) => {
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
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      console.log('Firestore에 유저 저장 완료');
    } else {
      console.log('이미 있는 유저 입니다!');
    }
  } catch (error) {
    console.error('🚨 Firestore 저장 오류:', error);
  }
};
