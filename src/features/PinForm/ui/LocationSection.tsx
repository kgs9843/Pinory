import React from 'react';
import { View, Text } from 'react-native';

import { Coords } from '@shared/types';

interface Props {
  location: Coords | null;
  address: string | null;
}

const LocationSection = ({ location, address }: Props) => {
  return (
    <View className="mb-4 flex-col rounded-2xl border border-gray-200 p-4">
      <View className="mb-4 flex-row items-start justify-start gap-5">
        <View className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200">
          <Text>d</Text>
        </View>
        <View className="flex-col">
          <Text className="text-xl font-bold">현재 위치</Text>
          {location ? (
            <View>
              <Text>자동으로 감지됨</Text>
              <Text>{`위도: ${location.latitude}, 경도: ${location.longitude}`}</Text>
            </View>
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
  );
};

export default LocationSection;
