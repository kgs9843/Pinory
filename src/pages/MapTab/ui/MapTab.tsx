import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MapScreen from '@features/map/ui/MapScreen';

const MapTab = () => {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1" style={{ paddingTop: insets.bottom }}>
      <MapScreen />
    </View>
  );
};
export default MapTab;
