import React from 'react';
import { Text, View } from 'react-native';

import LoginButtonView from '@features/Login/ui/LoginButtonView';
import LoginVideo from '@features/Login/ui/LoginVideo';

import { RootNavigationProp } from '@shared/types/navigation';

interface Props {
  navigation: RootNavigationProp<'Login'>;
}

const LoginScreen = ({ navigation }: Props) => {
  return (
    <View className="flex-1">
      <LoginVideo>
        <View className="relative top-[-30px] w-full">
          <View className="mb-[120px] w-full flex-col justify-start gap-2">
            <Text className="text-[85px] text-white">Pinory</Text>
            <Text className="text-[16px] text-white">소중한 추억을 지도에 남겨보세요</Text>
          </View>
          <LoginButtonView navigation={navigation} />
        </View>
      </LoginVideo>
    </View>
  );
};

export default LoginScreen;
