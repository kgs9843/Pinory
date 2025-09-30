import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { RootNavigationProp } from '@shared/types/navigation';
import HeaderLayout from '@shared/ui/HeaderLayout';

interface Props {
  title: string;
  navigation: RootNavigationProp<'PinForm'>;
}

const PinFormScreenHeader = ({ title, navigation }: Props) => {
  return (
    <HeaderLayout
      left={
        <TouchableOpacity onPress={() => navigation.goBack()} className="text-2xl">
          {/* TODO: +아이콘으로 대체 */}
          <Text className="text-sm">닫기</Text>
        </TouchableOpacity>
      }
      center={<Text className="text-2xl font-bold">{title}</Text>}
    />
  );
};

export default PinFormScreenHeader;
