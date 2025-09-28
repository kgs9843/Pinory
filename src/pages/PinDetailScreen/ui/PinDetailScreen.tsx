import React from 'react';
import { Text, View } from 'react-native';

import PinDetailScreenHeader from '@/src/widgets/pinDetailScreen/ui/PinDetailScreenHeader';

import { PinDetailScreenProps } from '@shared/types/navigation';

const PinDetailScreen = ({ navigation, route }: PinDetailScreenProps) => {
  // NOTE: 라우트로 받은 pin ID
  const { pinId } = route.params;
  console.log(pinId);

  return (
    <View>
      <PinDetailScreenHeader title="피드 상세" navigation={navigation} />
      <Text>PinDetailTab</Text>
    </View>
  );
};

export default PinDetailScreen;
