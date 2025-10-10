import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { Category } from '@entities/category/model/type';

export const SaveCategoryToFirestore = async (name: string, color: string): Promise<void> => {
  try {
    const currentUser = auth().currentUser;
    if (!currentUser) throw new Error('로그인된 사용자가 없습니다.');

    console.log(currentUser);

    const ref = firestore().collection('Users').doc(currentUser.uid).collection('Categories').doc();

    // TODO: 추후 sns확장을 위해서 isShared
    const newCategory: Category = {
      id: ref.id,
      name,
      color,
      isShared: false,
    };

    await ref.set({ ...newCategory, createdAt: firestore.FieldValue.serverTimestamp() });
    console.log(' Firestore에 새 카테고리 추가 완료:', newCategory);
  } catch (error) {
    console.error(' Firestore 카테고리 추가 오류:', error);
    throw error;
  }
};
