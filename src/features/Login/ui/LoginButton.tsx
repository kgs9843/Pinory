import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

interface Props {
  title: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
}
const LoginButton = ({
  title,
  onPress,
  icon,
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
}: Props) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-row items-center justify-center rounded-full px-6 py-4 ${bgColor}`}
  >
    {icon && <View className="absolute left-8">{icon}</View>}
    <Text className={`text-lg font-semibold ${textColor}`}>{title}</Text>
  </TouchableOpacity>
);

export default LoginButton;
