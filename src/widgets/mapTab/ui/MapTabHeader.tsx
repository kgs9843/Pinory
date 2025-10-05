import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { RootNavigationProp } from '@shared/types/navigation';
import HeaderLayout from '@shared/ui/HeaderLayout';

interface Props {
  navigation: RootNavigationProp<'Main'>;
}

const MapTabHeader = ({ navigation }: Props) => {
  return (
    <HeaderLayout
      left={
        <TouchableOpacity
          // FIXME: 추후 수정
          onPress={() => navigation.navigate('PinForm', { pinId: '-1' })}
          className="text-2xl"
        >
          {/* TODO: +아이콘으로 대체 */}
          <Text className="text-3xl">+</Text>
        </TouchableOpacity>
      }
      center={<Text className="text-2xl font-bold">Pinory</Text>}
    />
  );
};

export default MapTabHeader;
