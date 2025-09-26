import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
interface MapErrorProps {
  errorMessage: string;
  onRetry: () => void;
}

const MapError: React.FC<MapErrorProps> = ({ errorMessage, onRetry }) => {
  const [retryAttempt, setRetryAttempt] = useState<number>(0);

  const openAppSettings = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('설정 화면을 열 수 없습니다.', '기기 설정에서 직접 권한을 변경해 주세요.');
    });
  };

  const handleRetryWithFeedback = () => {
    onRetry();
    setRetryAttempt(prev => prev + 1);

    // NOTE: 2초 후에도 에러 화면이 사라지지 않으면 실패로 간주하고 경고창 띄우기
    setTimeout(() => {
      if (retryAttempt >= 2) {
        Alert.alert(
          '재시도 실패',
          '오류 해결 후에도 위치 권한을 다시 확인할 수 없습니다. 앱을 종료 후 다시 실행해 주세요.',
          [{ text: '확인' }],
        );
      }
    }, 2000);
  };
  return (
    <View className="flex-1 items-center justify-center bg-gray-50 p-6">
      <Text className="mb-4 text-xl font-bold text-red-600">위치 권한이 필요합니다.</Text>
      <Text className="mb-8 text-center text-gray-700">
        정확한 지도 서비스를 이용하려면 위치 권한을 허용해야 합니다. 아래 버튼을 눌러 설정에서 직접
        권한을 변경해 주세요.
      </Text>

      <View className="flex-row justify-center gap-5">
        {/* 설정 화면으로 이동하는 버튼 */}
        <TouchableOpacity
          onPress={openAppSettings}
          className="rounded-lg bg-gray-400 px-4 py-3 shadow-md"
        >
          <Text className="text-base font-semibold text-white">설정으로 이동</Text>
        </TouchableOpacity>

        {/* 재로딩 버튼 */}
        <TouchableOpacity
          onPress={handleRetryWithFeedback}
          className="rounded-lg bg-blue-600 px-6 py-3 shadow-md"
        >
          <Text className="text-base font-semibold text-white">재시도</Text>
        </TouchableOpacity>
      </View>

      <Text className="mt-4 text-center text-sm text-gray-500">{errorMessage}</Text>
    </View>
  );
};

export default MapError;
