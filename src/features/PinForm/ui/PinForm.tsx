import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { PinDetail } from '@entities/pin/model/types';

import { getAddressFromCoordinates } from '@shared/lib/locationUtils';
import { useImagePicker } from '@shared/lib/useImagePicker';
import useLocation from '@shared/lib/useLocation';

import ImagePickerSection from './ImagePickerSection';
import InputField from './InputField';
import LocationSection from './LocationSection';

// NOTE: 사진 최대 5장
export const IMAGE_PICKER_MAX_COUNT = 5;
// NOTE: 사진 한 장당 최대 100MB
export const IMAGE_PICKER_MAX_SIZE_MB = 100;
// NOTE: 제목 글자 수 제한
export const TITLE_MAX_LENGTH = 50;
// NOTE: 본문 글자 수 제한
export const DESCRIPTION_MAX_LENGTH = 500;

interface Props {
  // NOTE :편집 시 초기 데이터
  initialData?: PinDetail;
}

const PinForm = ({ initialData }: Props) => {
  const [retryCount] = useState(0);
  const { location, loading: locationLoading } = useLocation(retryCount);

  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [address, setAddress] = useState<string | null>(initialData?.locationName ?? '');

  const {
    images,
    pickImages,
    error: imageError,
    removeImage,
  } = useImagePicker(initialData?.imageUrl ?? [], {
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

  const onSubmit = () => {
    if (!location) {
      Alert.alert('위치 정보 없음', '현재 위치를 불러올 수 없습니다.');
      return;
    }

    const newPin: PinDetail = {
      id: initialData?.id ?? Date.now().toString(),
      title,
      description,
      imageUrl: images,
      latitude: location.latitude,
      longitude: location.longitude,
      categoryId: initialData?.categoryId ?? '1',
      date: new Date().toISOString(),
      user: {
        name: '사용자',
        profileImage: 'https://placekitten.com/200/200',
      },
      locationName: address ?? '',
    };

    console.log('저장된 핀 데이터:', newPin);
    Alert.alert('저장 완료', '핀 데이터가 성공적으로 저장되었습니다.');
  };

  return (
    <KeyboardAwareScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ flexGrow: 1, padding: 16, paddingVertical: 24 }}
      bottomOffset={80}
    >
      {/* 위치 */}
      <LocationSection location={location} loading={locationLoading} address={address} />

      {/* 사진 */}
      <ImagePickerSection
        images={images}
        error={imageError}
        maxCount={IMAGE_PICKER_MAX_COUNT}
        pickImages={pickImages}
        removeImage={removeImage}
      />

      {/* 제목 */}
      <InputField
        label="제목"
        value={title}
        setValue={setTitle}
        maxLength={TITLE_MAX_LENGTH}
        placeholder="이 순간을 한 줄로 표현해보세요"
      />

      {/* 내용 */}
      <InputField
        label="내용"
        value={description}
        setValue={setDescription}
        maxLength={DESCRIPTION_MAX_LENGTH}
        placeholder="이곳에서의 경험과 감정을 자유롭게 적어보세요..."
        multiline
      />

      {/* 저장 버튼 */}
      <TouchableOpacity onPress={onSubmit} className="rounded-full bg-blue-500 py-4">
        <Text className="text-center font-semibold text-white">추억 저장하기</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default PinForm;
