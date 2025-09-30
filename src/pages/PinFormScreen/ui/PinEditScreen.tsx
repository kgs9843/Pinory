import React from 'react';
import { View } from 'react-native';

import PinFormScreenHeader from '@widgets/pinFormScreen/ui/PinFormScreenHeader';

import { RootNavigationProp } from '@shared/types/navigation';

interface Props {
  navigation: RootNavigationProp<'PinForm'>;
  pinId: string;
}

const PinEditScreen = ({ navigation, pinId }: Props) => {
  console.log(pinId);
  return (
    <View className="flex-1 bg-white">
      <PinFormScreenHeader title="추억 편집" navigation={navigation} />
    </View>
  );
};

export default PinEditScreen;
