import React, { useState, useRef } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Props {
  images: string[];
}

const PinDetailImages = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<string>>(null);

  // NOTE: 사진이 1장일 경우
  if (images.length === 1) {
    return <Image source={{ uri: images[0] }} className="h-96 w-full" resizeMode="cover" />;
  }

  // NOTE: 사진 2장 이상일 경우
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <View className="relative h-96 w-full">
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={{ width, height: 384 }} resizeMode="cover" />
        )}
      />

      {/* 페이지 인디케이터 */}
      <View className="absolute bottom-[-14px] w-full flex-row justify-center gap-1">
        {images.map((_, idx) => (
          <View
            key={idx}
            className={`h-2 w-2 rounded-full ${idx === currentIndex ? 'bg-slate-400' : 'bg-black'}`}
          />
        ))}
      </View>
    </View>
  );
};

export default PinDetailImages;
