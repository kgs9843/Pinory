import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RootNavigationProp } from '@shared/types/navigation';

interface Props {
  navigation: RootNavigationProp<'Main'>;
}

const MapTabHeader = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View className="z-50 w-full" style={{ paddingTop: insets.top }}>
      <View className="h-[50px] w-full flex-row items-center justify-center">
        <TouchableOpacity
          // FIXME: 추후 수정
          onPress={() => navigation.navigate('PinCreate')}
          className="absolute left-3 text-2xl"
        >
          {/* TODO: +아이콘으로 대체 */}
          <Text className="text-3xl">+</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-bold">Pinory</Text>
      </View>
    </View>
  );
};

export default MapTabHeader;
