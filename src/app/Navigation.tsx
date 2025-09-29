import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import PinDetailScreen from '@pages/PinDetailScreen/ui/PinDetailScreen';

import { RootStackParamList } from '@shared/types/navigation';

import MainTabNavigator from './TabNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen
          name="PinDetail"
          component={PinDetailScreen}
          options={{
            presentation: 'modal',
            gestureEnabled: true,
            animation: 'slide_from_bottom',
            headerShown: false,
          }}
        />
        {/* FIXME: 추후 수정 */}
        {/* <Stack.Screen name="PinCreate" component={PinDetailScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
