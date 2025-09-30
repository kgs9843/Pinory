import React from 'react';
import { Text, View } from 'react-native';

import PinDetailScreenHeader from '@widgets/pinDetailScreen/ui/PinDetailScreenHeader';

import { usePinDetailInformation } from '@features/pinDetail/model/usePinDetailInformation';
import PinDetailCard from '@features/pinDetail/ui/PinDetailCard';

import { PinDetailScreenProps } from '@shared/types/navigation';
import LoadingSpinner from '@shared/ui/LoadingSpinner';

const PinDetailScreen = ({ navigation, route }: PinDetailScreenProps) => {
  // NOTE: 라우트로 받은 pin ID
  const { pinId } = route.params;

  const { pin, loading, error } = usePinDetailInformation(pinId);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !pin) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>{error ?? '데이터 없음'}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <PinDetailScreenHeader title="추억 상세" navigation={navigation} pinId={pin.id} />
      <PinDetailCard pin={pin} />
    </View>
  );
};

export default PinDetailScreen;
