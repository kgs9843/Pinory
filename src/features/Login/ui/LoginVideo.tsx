import { useEventListener } from 'expo';
import { useVideoPlayer, VideoView, VideoPlayerStatus } from 'expo-video';
import React, { useState } from 'react';
import { View, Image } from 'react-native';

import loginImage from '@/assets/images/loginScreen.png';
import loginVideo from '@/assets/videos/LoginScreenVideo_optimized.mp4';

interface LoginVideoProps {
  children?: React.ReactNode;
}

const LoginVideo = ({ children }: LoginVideoProps) => {
  const [playerStatus, setPlayerStatus] = useState<VideoPlayerStatus>('loading');
  const player = useVideoPlayer(loginVideo, player => {
    player.loop = true;
    player.play();
    player.muted = true;
  });

  useEventListener(player, 'statusChange', ({ status, error }) => {
    setPlayerStatus(status);
    if (error) {
      console.error('Video Player Error:', error);
    }
    console.log('Player status changed: ', status);
  });

  return (
    <View className="flex-1">
      {playerStatus === 'readyToPlay' ? (
        //  NOTE: 비디오가 준비/재생 중일 때 VideoView 렌더링
        <VideoView
          player={player}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          contentFit="cover"
        />
      ) : (
        // NOTE: 로딩 중일 때 검은 배경 뷰 렌더링
        <Image source={loginImage} className="absolute inset-0" style={{ resizeMode: 'cover' }} />
      )}

      {/* 2. 어두운 오버레이 */}
      <View className="absolute bottom-0 left-0 right-0 top-0 bg-black/40" />
      {/* 3. 로그인 UI 영역 (children) */}
      <View className="absolute inset-0 items-center justify-center px-8">{children}</View>
    </View>
  );
};
export default LoginVideo;
