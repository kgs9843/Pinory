import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { PinFormData } from '@entities/pin/model/types';

import { getAddressFromCoordinates } from '@shared/lib/locationUtils';
import { useImagePicker } from '@shared/lib/useImagePicker';
import { useLocationStore } from '@shared/store/useLocationStroe';
import { RootNavigationProp } from '@shared/types/navigation';
import LoadingSpinner from '@shared/ui/LoadingSpinner';

import CategoryField from './CategoryField';
import ImagePickerSection from './ImagePickerSection';
import InputField from './InputField';
import LocationSection from './LocationSection';
import { savePinToFirestore } from '../api/savePinToFirestore';

// NOTE: 사진(동영상) 최대 5장
export const IMAGE_PICKER_MAX_COUNT = 5;
// NOTE: 사진(동영상) 한 장당 최대 500MB
export const IMAGE_PICKER_MAX_SIZE_MB = 500;
// NOTE: 제목 글자 수 제한
export const TITLE_MAX_LENGTH = 50;
// NOTE: 본문 글자 수 제한
export const DESCRIPTION_MAX_LENGTH = 500;

interface Props {
  // NOTE :편집 시 초기 데이터
  initialData?: PinFormData;
  navigation: RootNavigationProp<'PinForm'>;
}

const PinForm = ({ initialData, navigation }: Props) => {
  const location = useLocationStore(state => state.location);
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialData?.categoryId ?? null,
  );
  const [address, setAddress] = useState<string | null>(initialData?.locationName ?? '');
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  // NOTE: 그외 예외처리들
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    category: '',
  });

  const currentUser = auth().currentUser;

  const {
    files,
    pickFiles,
    error: fileError,
    removeFile,
    loading,
  } = useImagePicker(initialData?.fileUrl ?? [], {
    maxCount: IMAGE_PICKER_MAX_COUNT,
    maxSizeMB: IMAGE_PICKER_MAX_SIZE_MB,
  });

  //NOTE: 현재 위치를 통한 지역명 불러오기
  useEffect(() => {
    if (location) {
      getAddressFromCoordinates(location.latitude, location.longitude).then(res =>
        setAddress(res ?? ''),
      );
    }
  }, [location]);

  const onSubmit = async () => {
    setErrors({ title: '', description: '', category: '' });

    let isValid = true;
    const newErrors = { title: '', description: '', category: '' };

    if (!location) {
      Alert.alert('위치 정보 없음', '현재 위치를 불러올 수 없습니다.');
      return;
    }
    if (!address) {
      Alert.alert('선택된 주소가 없습니다.');
      return;
    }
    if (!currentUser) {
      Alert.alert('로그인된 사용자가 없습니다.');
      return;
    }
    if (!title.trim()) {
      newErrors.title = '* 제목을 입력해주세요.';
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = '* 내용을 입력해주세요.';
      isValid = false;
    }

    if (!selectedCategory) {
      newErrors.category = '* 카테고리를 선택해주세요.';
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    const newPin: PinFormData = {
      title,
      description,
      fileUrl: files,
      latitude: location.latitude,
      longitude: location.longitude,
      categoryId: selectedCategory!,
      date: new Date().toISOString(),
      locationName: address,
    };

    // NOTE: 핀 저장 로직
    setSubmitLoading(true);
    console.log(submitLoading);
    await savePinToFirestore(newPin);

    setSubmitLoading(false);

    console.log('저장된 핀 데이터:', newPin);
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ flexGrow: 1, padding: 16, paddingVertical: 24 }}
      bottomOffset={80}
    >
      {/* 위치 */}
      <LocationSection location={location} address={address} />

      {/* 사진 */}
      <ImagePickerSection
        files={files}
        error={fileError}
        maxCount={IMAGE_PICKER_MAX_COUNT}
        pickFiles={pickFiles}
        removeFile={removeFile}
        loading={loading}
      />

      {/* 제목 */}
      <InputField
        label="제목"
        value={title}
        setValue={setTitle}
        maxLength={TITLE_MAX_LENGTH}
        placeholder="이 순간을 한 줄로 표현해보세요"
        error={errors.title}
      />

      {/* 내용 */}
      <InputField
        label="내용"
        value={description}
        setValue={setDescription}
        maxLength={DESCRIPTION_MAX_LENGTH}
        placeholder="이곳에서의 경험과 감정을 자유롭게 적어보세요..."
        multiline
        error={errors.description}
      />
      {/* {카테고리} */}
      <CategoryField
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        error={errors.category}
      />

      {/* 저장 버튼 */}
      <TouchableOpacity
        onPress={onSubmit}
        disabled={submitLoading}
        className={`rounded-full py-4 ${submitLoading ? 'bg-gray-400' : 'bg-blue-500'}`}
      >
        {submitLoading ? (
          <LoadingSpinner />
        ) : (
          <Text className="text-center font-semibold text-white">추억 저장하기</Text>
        )}
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default PinForm;
