import React, { useRef, useEffect } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Modalize } from 'react-native-modalize';

import type { Pin } from '@/src/shared/types';

import { categoryData } from '@shared/config/dummyCategories';
import { getCategoryColor } from '@shared/lib/getCategoryColor';

interface Props {
  selectedPin: Pin | null;
  setSelectedPin: (pin: Pin | null) => void;
  onDetailPress?: (pin: Pin) => void; // 자세히보기 버튼 콜백
}

const PinBottomSheet = ({ selectedPin, setSelectedPin, onDetailPress }: Props) => {
  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    if (selectedPin) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [selectedPin]);

  const getCategoryName = (categoryId: number) => {
    const category = categoryData.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  return (
    <Modalize
      ref={modalizeRef}
      withOverlay={false}
      onClosed={() => setSelectedPin(null)}
      panGestureEnabled={true}
      adjustToContentHeight={true}
      handlePosition="inside"
      handleStyle={{
        width: 50,
        backgroundColor: '#ccc',
      }}
      modalStyle={{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      {selectedPin && (
        <View className="h-full flex-col justify-center gap-1 p-6">
          {/* 이미지 */}
          {selectedPin.imageUrl && (
            <Image
              source={{ uri: selectedPin.imageUrl }}
              className="mb-4 h-32 w-full rounded-lg"
              resizeMode="cover"
            />
          )}

          {/* 색깔 + 카테고리 이름 */}
          <View className="flex-row items-center">
            <View
              className="mr-2 h-4 w-4 rounded-full"
              style={{ backgroundColor: getCategoryColor(selectedPin.categoryId) }}
            />
            <Text className="text-gray-500">{getCategoryName(selectedPin.categoryId)}</Text>
          </View>

          {/* 피드 제목 */}
          <Text className="mb-1 text-2xl font-bold">{selectedPin.title}</Text>

          {/* 피드 내용 */}
          <Text className="mb-2 text-gray-700">{selectedPin.description}</Text>

          {/* 위치 */}
          <View className="mb-4 flex-row items-center">
            <Text className="text-gray-400">{selectedPin.locationName}</Text>
            {/* TODO: 위치 아이콘 */}
          </View>
          {/* 자세히보기 버튼 */}
          <Pressable
            className="rounded-full bg-blue-500 py-2"
            onPress={() => selectedPin && onDetailPress?.(selectedPin)}
          >
            <Text className="text-center font-semibold text-white">자세히 보기</Text>
          </Pressable>
          <View className="h-[100px]" />
        </View>
      )}
    </Modalize>
  );
};

export default PinBottomSheet;
