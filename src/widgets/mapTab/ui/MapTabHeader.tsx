import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MapTabHeader = () => {
  const insets = useSafeAreaInsets();
  return (
    <View className="z-50 w-full" style={{ paddingTop: insets.top }}>
      <View className="h-[50px] w-full flex-row items-center justify-center">
        <Text className="absolute left-3 text-2xl">+</Text>
        <Text className="text-2xl">Pinory</Text>
      </View>
    </View>
  );
};

export default MapTabHeader;
