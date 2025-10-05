import React from 'react';
import { View } from 'react-native';

import PinFormScreenHeader from '@widgets/pinFormScreen/ui/PinFormScreenHeader';

import PinForm from '@features/PinForm/ui/PinForm';

import { RootNavigationProp } from '@shared/types/navigation';

interface Props {
  navigation: RootNavigationProp<'PinForm'>;
}

const PinCreate = ({ navigation }: Props) => {
  return (
    <View className="flex-1 bg-white">
      <PinFormScreenHeader title="추억 작성" navigation={navigation} />
      <PinForm />
    </View>
  );
};

export default PinCreate;
