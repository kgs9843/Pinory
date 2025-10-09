import '@/global.css';
import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useLoadedAssets from '@shared/lib/useLoadedAssets';

import { Navigation } from './Navigation';

const App = () => {
  const { fontsLoaded, onLayoutRootView } = useLoadedAssets();

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider>
          <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <Navigation />
          </View>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
