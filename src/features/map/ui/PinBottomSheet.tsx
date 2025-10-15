import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';

import { Pin } from '@entities/pin/model/types';

import { getCategoryColor, getCategoryName } from '@shared/lib/getCategory';
import { RootNavigationProp } from '@shared/types/navigation';
import BottomSheetModal from '@shared/ui/BottomSheetModal';

interface Props {
  selectedPin: Pin | null;
  setSelectedPin: React.Dispatch<React.SetStateAction<Pin | null>>;
}

const PinBottomSheet = ({ selectedPin, setSelectedPin }: Props) => {
  const navigation = useNavigation<RootNavigationProp<'Main'>>();

  return (
    <BottomSheetModal isOpen={!!selectedPin} onClose={() => setSelectedPin(null)}>
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
            onPress={() => navigation.navigate('PinDetail', { pinId: selectedPin.id })}
          >
            <Text className="text-center font-semibold text-white">자세히 보기</Text>
          </Pressable>
          <View className="h-[100px]" />
        </View>
      )}
    </BottomSheetModal>
  );
};

export default PinBottomSheet;
