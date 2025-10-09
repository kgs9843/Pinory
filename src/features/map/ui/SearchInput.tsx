import React, { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';

import SearchIconSVG from '@/assets/images/search-icon.svg';

import { getCoordinatesFromAddress } from '@shared/lib/locationUtils';
import { ShadowStyles } from '@shared/ui/shadow';

interface Props {
  onSearch: (coords: { latitude: number; longitude: number }) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) {
      //Alert.alert('검색어를 입력해주세요.');
      return;
    }

    try {
      const coords = await getCoordinatesFromAddress(query.trim());

      if (coords) {
        onSearch(coords); // 검색 결과를 전달
      } else {
        Alert.alert('검색 결과를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('handleSearch error:', error);
      Alert.alert('위치 검색 중 오류가 발생했습니다.');
    }
  };

  return (
    <View className="absolute left-0 right-0 top-4 z-10 flex-row justify-center gap-5 bg-transparent">
      <View className="flex-row items-center justify-center">
        <TextInput
          className="h-14 w-[250px] rounded-full border border-gray-300 bg-white px-14"
          style={ShadowStyles.shadowMd}
          placeholder="장소를 검색해보세요"
          placeholderTextColor="#000"
          onChangeText={setQuery}
          value={query}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <View className="absolute left-[18px]">
          <SearchIconSVG height={20} />
        </View>
      </View>
    </View>
  );
};

export default SearchInput;
