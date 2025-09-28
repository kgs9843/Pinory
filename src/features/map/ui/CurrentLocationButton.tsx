import React from 'react';
import { TouchableOpacity } from 'react-native';

import CurrentLocationIconSvg from '@/assets/images/current-location-icon.svg';

import { ShadowStyles } from '@shared/ui/shadow';

interface Props {
  onPress: () => void;
  visible: boolean;
}

const CurrentLocationButton = ({ onPress, visible }: Props) => {
  if (!visible) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute bottom-[120px] right-4 flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white"
      style={ShadowStyles.shadowMd}
    >
      <CurrentLocationIconSvg />
    </TouchableOpacity>
  );
};

export default CurrentLocationButton;
