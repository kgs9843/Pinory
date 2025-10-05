import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';

interface props {
  content?: string;
}

const LoadingSpinner = ({ content }: props) => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="small" color="#0000ff" />
      {content ? <Text className="mt-4 text-base text-gray-700">{content}</Text> : null}
    </View>
  );
};

export default LoadingSpinner;
