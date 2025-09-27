import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const MapLoading = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color="#0000ff" />
      <Text className="mt-4 text-base text-gray-700">위치 정보를 불러오는 중...</Text>
    </View>
  );
};

export default MapLoading;
