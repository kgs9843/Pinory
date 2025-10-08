import React from 'react';
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
  const { signIn } = useGoogleLogin();
  const handleResult = async (type: LoginType): Promise<void> => {
    if (type === 'google') {
      console.log('✅ Google OAuth 로그인 실행');
      const user = await signIn();
      if (user) {
        navigation.replace('Main'); // 로그인 성공 시 이동
      }
    } else {
      console.error(`🚨 알 수 없는 로그인 타입: ${type}`);
    }
    // TODO: 추후 수정 필요
    navigation.replace('Main');
  };

  return (
    <View>
      <LoginButton
        title="Google Login"
        onPress={() => handleResult('google')}
        icon={<GoogleLogoSvg width={25} />}
        bgColor="bg-white"
        textColor="text-black"
      />
    </View>
  );
};

export default LoginButtonView;
