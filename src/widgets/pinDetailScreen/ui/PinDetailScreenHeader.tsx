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
    <View className="z-50 w-full bg-slate-400 px-4" style={{ paddingTop: insets.top }}>
      <View className="h-[50px] w-full flex-row items-center justify-between">
        <TouchableOpacity onPress={() => navigation.goBack()} className="w-[50px] text-2xl">
          {/* TODO: +아이콘으로 대체 */}
          <Text className="text-sm">닫기</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-bold">{title}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} className="w-[50px] text-2xl">
          {/* TODO: +아이콘으로 대체 */}
          <Text className="text-sm">편집</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PinDetailScreenHeader;
