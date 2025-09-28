import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import CreateTab from '@pages/CreateTab/ui/CreateTab';
import MapTab from '@pages/MapTab/ui/MapTab';
import ProfileTab from '@pages/ProfileTab/ui/ProfileTab';

import MapTabHeader from '@widgets/mapTab/ui/MapTabHeader';

import { RootNavigationProp } from '@shared/types/navigation';
import BottomTabBar from '@shared/ui/BottomTabBar';

interface Props {
  navigation: RootNavigationProp<'Main'>;
}

const Tab = createBottomTabNavigator();
const MainTabNavigator = ({ navigation }: Props) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
      }}
      tabBar={props => <BottomTabBar {...props} />}
    >
      <Tab.Screen
        name="MapTab"
        component={MapTab}
        options={{
          header: () => <MapTabHeader navigation={navigation} />,
        }}
      />
      <Tab.Screen
        name="CreateTab"
        component={CreateTab}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileTab}
        options={{
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
        name="RecipeCreate"
        component={RecipeCreate}
        options={{
          header: () => <RecipeCreateTopsection />,
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
