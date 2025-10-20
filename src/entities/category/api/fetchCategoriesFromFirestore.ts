import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { Category } from '../model/type';

export const fetchCategoriesFromFirestore = async (): Promise<Category[]> => {
  try {
    const currentUser = auth().currentUser;
    if (!currentUser) throw new Error('로그인된 사용자가 없습니다.');

    const snapshot = await firestore()
      .collection('Users')
      .doc(currentUser.uid)
      .collection('Categories')
      .orderBy('createdAt', 'asc')
      .get();

    const categories: Category[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Category, 'id'>),
    }));

    return categories;
  } catch (error) {
    console.error('🚨 Firestore 카테고리 불러오기 오류:', error);
    throw error;
  }
};
