import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import LoadingSpinner from '@shared/ui/LoadingSpinner';

interface Props {
  title: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  isLoading: boolean;
}
const LoginButton = ({
  title,
  onPress,
  icon,
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
  isLoading,
}: Props) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={isLoading}
    className={`h-[45px] w-[300px] flex-row items-center justify-center rounded-full ${bgColor}`}
  >
    {isLoading ? (
      <LoadingSpinner />
    ) : (
      <>
        {icon && <View className="absolute left-8">{icon}</View>}
        <Text className={`text-lg font-semibold ${textColor}`}>{title}</Text>
      </>
    )}
  </TouchableOpacity>
);

export default LoginButton;
