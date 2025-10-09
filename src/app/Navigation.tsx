import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import PinFormScreen from '@/src/pages/PinFormScreen/ui/PinFormScreen';

import LoginScreen from '@pages/LoginScreen/ui/LoginScreen';
import PinDetailScreen from '@pages/PinDetailScreen/ui/PinDetailScreen';

import { RootStackParamList } from '@shared/types/navigation';

import MainTabNavigator from './TabNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
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
        <Stack.Screen
          name="PinForm"
          component={PinFormScreen}
          options={{
            presentation: 'modal',
            gestureEnabled: true,
            animation: 'slide_from_bottom',
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
