import storage from '@react-native-firebase/storage';
import { Platform } from 'react-native';
import uuid from 'react-native-uuid';

// NOTE: 로컬 URI를 Firebase Storage에 업로드 후 다운로드 URL 반환
const uploadFileToStorage = async (uri: string, pathPrefix: string): Promise<string> => {
  try {
    // NOTE: 파일 이름 추출
    const filename = uri.substring(uri.lastIndexOf('/') + 1);

    // NOTE: UUID 생성
    const fileId = uuid.v4();

    // NOTE: 현재 유저키에 따른 파일네임 저장
    const storageRef = storage().ref(`${pathPrefix}${fileId}/${filename}`);

    // NOTE: Android의 경우 file:/// 제거 필요
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    // NOTE: Storage에 업로드
    await storageRef.putFile(uploadUri);

    // NOTE: 업로드 완료 후 다운로드 URL 가져오기
    const downloadURL = await storageRef.getDownloadURL();

    return downloadURL;
  } catch (error) {
    console.error('파일 업로드 실패:', error);
    throw error;
  }
};

// NOTE: 여러 개 파일 업로드
export const uploadAllFiles = async (fileUris: string[], pathPrefix: string): Promise<string[]> => {
  const uploadPromises = fileUris.map(uri => uploadFileToStorage(uri, pathPrefix));
  return await Promise.all(uploadPromises);
};
