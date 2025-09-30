import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { PinDetail } from '@entities/pin/model/types';

import { getAddressFromCoordinates } from '@shared/lib/locationUtils';
import { useImagePicker } from '@shared/lib/useImagePicker';
import useLocation from '@shared/lib/useLocation';

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
      id: initialData?.id ?? Date.now().toString(), // 신규 생성 시 임시 ID
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
      locationName: '현재 위치 이름 (TODO: reverse geocoding)',
    };

    // 👉 여기서 API 요청 or 상태 관리 저장 처리
    console.log('저장된 핀 데이터:', newPin);

    Alert.alert('저장 완료', '핀 데이터가 성공적으로 저장되었습니다.');
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      extraHeight={50}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={100}
    >
      <View className="flex-1 bg-white p-4 py-6">
        {/* 현재 위치 */}
        <View className="mb-4 flex-col rounded-2xl border border-gray-200 p-4">
          <View className="mb-4 flex-row items-start justify-start gap-5">
            <View className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200">
              <Text>d</Text>
            </View>
            <View className="flex-col">
              <Text className="text-xl font-bold">현재 위치</Text>
              {locationLoading ? (
                <Text>위치 불러오는 중...</Text>
              ) : location ? (
                <Text>{`위도: ${location.latitude}, 경도: ${location.longitude}`}</Text>
              ) : (
                <Text>위치를 감지할 수 없습니다.</Text>
              )}
            </View>
          </View>
          <View className="rounded-lg border-none bg-slate-300 p-4">
            <Text>{address}</Text>
          </View>
          <Text className="text-md mt-4 font-bold text-blue-400">위치 변경</Text>
        </View>

        {/* 사진 추가 */}
        <View className="mb-4 flex-col rounded-2xl border border-gray-200 p-4">
          <View className="mb-4 w-full flex-row justify-between">
            <Text className="font-semibold">사진 추가 </Text>
            <Text className="font-semibold">선택사항</Text>
          </View>
          <ScrollView horizontal className="mb-4 flex-row gap-2">
            {images.map((uri, idx) => (
              <View key={idx}>
                <Image source={{ uri }} className="mr-1 h-[100px] w-[100px] rounded-lg" />
                <TouchableOpacity
                  className="absolute right-[6px] top-[6px] flex h-5 w-5 items-center justify-center rounded-full bg-white"
                  onPress={() => removeImage(uri)}
                >
                  <Text>x</Text>
                </TouchableOpacity>
              </View>
            ))}
            {images.length < IMAGE_PICKER_MAX_COUNT ? (
              <TouchableOpacity
                onPress={pickImages}
                className="h-[100px] w-[100px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300"
              >
                <Text>+</Text>
                <Text>사진 추가</Text>
              </TouchableOpacity>
            ) : null}
          </ScrollView>
          <View className="mt-1 w-full flex-row justify-between">
            {imageError && <Text className="mb-2 text-red-500">{imageError}</Text>}
            <View />
            <Text className="text-gray-500">
              {images.length} / {IMAGE_PICKER_MAX_COUNT}장 선택
            </Text>
          </View>
        </View>

        {/* 제목 */}
        <View className="mb-4 flex-col rounded-2xl border border-gray-200 p-4">
          <Text className="mb-1 font-semibold">제목 *</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="이 순간을 한 줄로 표현해보세요"
            maxLength={TITLE_MAX_LENGTH}
            className="rounded-lg border border-gray-300 p-2"
          />
          <Text className="text-right text-gray-400">
            {title.length}/{TITLE_MAX_LENGTH}
          </Text>
        </View>

        {/* 내용 */}
        <View className="mb-4 flex-col rounded-2xl border border-gray-200 p-4">
          <Text className="mb-1 font-semibold">내용 *</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            maxLength={DESCRIPTION_MAX_LENGTH}
            placeholder="이곳에서의 경험과 감정을 자유롭게 적어보세요..."
            multiline
            className="flex h-32 rounded-lg border border-gray-300 p-2"
            style={{ textAlignVertical: 'top' }}
          />
          <Text className="text-right text-gray-400">
            {description.length}/{DESCRIPTION_MAX_LENGTH}
          </Text>
        </View>

        {/* 내용 */}
        <View className="mb-6 flex-col rounded-2xl border border-gray-200 p-4">
          <Text className="mb-1 font-semibold">내용 *</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            maxLength={DESCRIPTION_MAX_LENGTH}
            placeholder="이곳에서의 경험과 감정을 자유롭게 적어보세요..."
            multiline
            className="flex h-32 rounded-lg border border-gray-300 p-2"
            style={{ textAlignVertical: 'top' }}
          />
          <Text className="text-right text-gray-400">
            {description.length}/{DESCRIPTION_MAX_LENGTH}
          </Text>
        </View>
        {/* 저장 버튼 */}
        <TouchableOpacity onPress={onSubmit} className="rounded-full bg-blue-500 py-4">
          <Text className="text-center font-semibold text-white">추억 저장하기</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default PinForm;
