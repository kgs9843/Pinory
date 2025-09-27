import '@/global.css';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useLoadedAssets from '@shared/hooks/useLoadedAssets';

import { Navigation } from './Navigation';

const App = () => {
  const { fontsLoaded, onLayoutRootView } = useLoadedAssets();

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Navigation />
      </View>
    </SafeAreaProvider>
  );
};

export default App;
