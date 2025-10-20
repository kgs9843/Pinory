import React from 'react';
import { Image, Text, View } from 'react-native';

import { PinDetail } from '@entities/pin/model/types';

import { getCategoryColor, getCategoryName } from '@shared/lib/getCategory';

import PinDetailImages from './PinDetailImages';

interface Props {
  pin: PinDetail;
}

const PinDetailCard = ({ pin }: Props) => {
  return (
    <View>
      {/* 프로필 */}
      <View className="mb-4 flex-row items-center p-4">
        <Image
          source={{ uri: pin.user.profileImage }}
          className="mr-3 h-10 w-10 rounded-full bg-slate-400"
        />
        <View>
          <Text className="font-bold">{pin.user.name}</Text>
          <View className="flex-row gap-2">
            {/* 색깔 + 카테고리 이름 */}
            <View className="flex-row items-center">
              <View
                className="mr-2 h-4 w-4 rounded-full"
                style={{ backgroundColor: getCategoryColor(pin.categoryId) }}
              />
              <Text className="text-gray-500">{getCategoryName(pin.categoryId)}</Text>
            </View>
            <Text>{'.'}</Text>
            <Text className="text-sm text-gray-500">{pin.date}</Text>
          </View>
        </View>
      </View>

      {/* 피드 사진 */}
      {pin.fileUrl ? <PinDetailImages images={pin.fileUrl} /> : null}

      {/* 본문 내용 */}
      <View className="mt-5 p-4">
        <Text className="mb-2 text-xl font-bold">{pin.title}</Text>
        <Text className="mb-4 text-gray-700">{pin.description}</Text>

        <Text className="mb-2 text-gray-600">{pin.locationName}</Text>
      </View>
    </View>
  );
};

export default PinDetailCard;
