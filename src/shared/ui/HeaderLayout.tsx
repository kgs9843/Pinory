import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
}

const HeaderLayout = ({ left, center, right }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View className="z-50 w-full bg-slate-400 px-4" style={{ paddingTop: insets.top }}>
      <View className="h-[50px] w-full flex-row items-center justify-center">
        {/* 왼쪽 영역 */}
        <View className="absolute left-2">{left}</View>

        {/* 중앙 영역 */}
        <View>{center}</View>

        {/* 오른쪽 영역 */}
        <View className="absolute right-2">{right}</View>
      </View>
    </View>
  );
};

export default HeaderLayout;
