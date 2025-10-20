import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

import { PinFormData } from '@entities/pin/model/types';

import { uploadAllFiles } from '@shared/lib/uploadFileToStorage';

// NOTE: Firestore에 핀 저장
export const savePinToFirestore = async (pinData: PinFormData) => {
  try {
    const currentUser = auth().currentUser;

    if (!currentUser) {
      Alert.alert('⚠️ 로그인 필요', '먼저 로그인해야 핀을 저장할 수 있습니다.');
      return;
    }
    // NOTE: 파일이 없을 경우 조기 종료
    if (!pinData.fileUrl || pinData.fileUrl.length === 0) {
      Alert.alert('⚠️ 파일 없음', '업로드할 파일이 없습니다.');
      return;
    }
    const ref = firestore().collection('Users').doc(currentUser.uid).collection('Pins').doc();

    const uploadedUrls = await uploadAllFiles(pinData.fileUrl, `${currentUser.uid}/pin/`);
    console.log(uploadedUrls);

    const dataToSave = {
      ...pinData,
      fileUrl: uploadedUrls,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    await ref.set(dataToSave);
    console.log(' Firestore에 새 피드 추가 완료:', dataToSave);
  } catch (error) {
    Alert.alert('❌ 오류', '피드 저장 중 문제가 발생했습니다.');
    console.error(error);
  }
};
