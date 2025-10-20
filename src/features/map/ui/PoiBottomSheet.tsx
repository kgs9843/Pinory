import React from 'react';
import { View, Text } from 'react-native';

import { Poi } from '@entities/pin/model/types';

import BottomSheetModal from '@shared/ui/BottomSheetModal';

interface Props {
  selectedPoi: Poi | null;
  clearPoi: () => void;
}

const PoiBottomSheet = ({ selectedPoi, clearPoi }: Props) => {
  return (
    <BottomSheetModal isOpen={!!selectedPoi} onClose={() => clearPoi()}>
      {selectedPoi && (
        <View className="h-full flex-col justify-center gap-1 p-6">
          {/* TODO: 추후 Google Places API를 통한 대표 이미지및 여러가지  불러오기 */}

          {/* 피드 제목 */}
          <Text className="mb-1 text-2xl font-bold">{selectedPoi.name}</Text>

          {/* 피드 내용
          <Text className="mb-2 text-gray-700">{selectedPoi.description}</Text> */}

          <View className="h-[100px]" />
        </View>
      )}
    </BottomSheetModal>
  );
};

export default PoiBottomSheet;
