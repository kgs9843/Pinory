import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

import { ShadowStyles } from './shadow';

const screenWidth = Dimensions.get('window').width;
const BOTTOM_TAB_BAR_WIDTH = 362;

// FIXME: {state,navigation}
const BottomTabBar = ({ navigation }: BottomTabBarProps) => {
  //   const currentRoute = state.routes[state.index].name;

  const tabs = [
    { name: 'MapTab', label: '맵' },
    { name: 'CreateTab', label: '작성' },
    { name: 'ProfileTab', label: '마이' },
    // { name: 'Mypage', label: '마이', On: MypageOn, Off: MypageOff },
  ];

  return (
    <View
      className="absolute bottom-[33px] h-[68px] flex-row justify-around rounded-full bg-white py-1.5 pl-8 pr-9"
      style={[
        ShadowStyles.shadowMd,
        {
          left: (screenWidth - BOTTOM_TAB_BAR_WIDTH) / 2,
          width: BOTTOM_TAB_BAR_WIDTH,
        },
      ]}
    >
      {tabs.map(tab => {
        // const ActiveIcon = tab.On;
        // const InactiveIcon = tab.Off;
        // const isFocused = currentRoute === tab.name;

        return (
          <TouchableOpacity
            key={tab.name}
            className="flex-1 items-center py-1"
            onPress={() => navigation.navigate(tab.name)}
          >
            {/* {isFocused ? <ActiveIcon /> : <InactiveIcon />}
            <Text
              className={cn('mt-2 text-[8px] font-semibold', isFocused ? 'text-sub2' : 'text-g2')}
            >
              {tab.label}
            </Text> */}
            <Text>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default BottomTabBar;
