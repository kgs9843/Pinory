import React from 'react';

import { PinFromScreenProps } from '@shared/types/navigation';

import PinCreateScreen from './PinCreateScreen';
import PinEditScreen from './PinEditScreen';

const PinFormScreen = ({ navigation, route }: PinFromScreenProps) => {
  // NOTE: 라우트로 받은 pin ID 만약 -1이면 create 그 외면 편집하기
  const { pinId } = route.params;
  console.log(pinId);

  if (pinId === '-1') {
    return <PinCreateScreen navigation={navigation} />;
  }

  return <PinEditScreen navigation={navigation} pinId={pinId} />;
};

export default PinFormScreen;
