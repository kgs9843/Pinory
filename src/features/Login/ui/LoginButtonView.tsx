import React, { useState } from 'react';
import { View } from 'react-native';

import GoogleLogoSvg from '@/assets/images/auth/google-logo-icon.svg';

import { RootNavigationProp } from '@shared/types/navigation';

import LoginButton from './LoginButton';
import { useGoogleLogin } from '../api/useGoogleLogin';

interface Props {
  navigation: RootNavigationProp<'Login'>;
}
type LoginType = 'google' | 'kakao' | 'naver';

const LoginButtonView = ({ navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useGoogleLogin();

  const handleResult = async (type: LoginType): Promise<void> => {
    // NOTE: 중복 클릭 방지
    if (isLoading) return;

    setIsLoading(true);

    try {
      if (type === 'google') {
        console.log('✅ Google OAuth 로그인 실행');
        const user = await signIn();
        if (user) {
          navigation.replace('Main');
        }
      } else {
        console.error(`🚨 알 수 없는 로그인 타입: ${type}`);
      }
    } catch (error) {
      console.error('🚨 로그인 처리 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="w-full flex-col items-center justify-center">
      <LoginButton
        title="Google Login"
        onPress={() => handleResult('google')}
        icon={<GoogleLogoSvg width={25} />}
        bgColor="bg-white"
        textColor="text-black"
        isLoading={isLoading}
      />
    </View>
  );
};

export default LoginButtonView;
