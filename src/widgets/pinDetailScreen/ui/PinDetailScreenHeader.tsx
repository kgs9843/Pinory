import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RootNavigationProp } from '@shared/types/navigation';

interface Props {
  title: string;
  navigation: RootNavigationProp<'PinDetail'>;
}

const PinDetailScreenHeader = ({ title, navigation }: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View className="z-50 w-full bg-slate-400" style={{ paddingTop: insets.top }}>
      <View className="h-[50px] w-full flex-row items-center justify-center">
        <TouchableOpacity onPress={() => navigation.goBack()} className="absolute left-3 text-2xl">
          {/* TODO: +아이콘으로 대체 */}
          <Text className="text-sm">닫기</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-bold">{title}</Text>
      </View>
    </View>
  );
};

export default PinDetailScreenHeader;
