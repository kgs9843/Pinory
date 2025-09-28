import '@/global.css';
import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <Navigation />
        </View>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
