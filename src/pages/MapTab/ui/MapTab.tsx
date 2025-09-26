import React from 'react';
import { View } from 'react-native';

import MapScreen from '@features/map/ui/MapScreen';

const MapTab = () => {
  return (
    <View className="flex-1">
      <MapScreen />
    </View>
  );
};
export default MapTab;
