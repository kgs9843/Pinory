import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { useFilteredPins } from '@features/map/model/useFilteredPins';
import { useMapControls } from '@features/map/model/useMapControls';
import { useSearchLocation } from '@features/map/model/useSearchLocation';
import CategoryDropdown from '@features/map/ui/CategoryDropdown';
import CurrentLocationButton from '@features/map/ui/CurrentLocationButton';
import MapError from '@features/map/ui/MapError';
import PinBottomSheet from '@features/map/ui/PinBottomSheet';
import PinList from '@features/map/ui/PinList';
import SearchInput from '@features/map/ui/SearchInput';

import { Pin } from '@entities/pin/model/types';

import useLocation from '@shared/lib/useLocation';
import { useCategoryStore } from '@shared/store/useCategoryStore';
import LoadingSpinner from '@shared/ui/LoadingSpinner';

// NOTE: 기본 줌 레벨 (delta 값)
const DEFAULT_DELTA = {
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

// NOTE: 초기위치(서울 남부)
const defaultRegion = {
  latitude: 37.5729,
  longitude: 126.9794,
  ...DEFAULT_DELTA,
};

const MapTab = () => {
  const mapRef = useRef<MapView>(null);
  const [retryCount, setRetryCount] = useState(0);
  const { location, loading, error } = useLocation(retryCount);
  const { handleSearch } = useSearchLocation(mapRef);
  const { goToCurrentLocation } = useMapControls(mapRef, location);
  const { selectedCategory } = useCategoryStore();
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);

  // NOTE: 에러 화면 retry check
  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
  }, []);

  // NOTE: 마커 걸러주는 로직 함수
  const filteredPins = useFilteredPins(selectedCategory);

  if (loading) {
    return <LoadingSpinner content="위치 정보를 불러오는 중..." />;
  }
  if (error) {
    return <MapError errorMessage={error} onRetry={handleRetry} />;
  }
  return (
    <View className="flex-1">
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={false}
        initialRegion={
          location
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: DEFAULT_DELTA.latitudeDelta,
                longitudeDelta: DEFAULT_DELTA.longitudeDelta,
              }
            : defaultRegion
        }
      >
        {/* 카테고리 마커들 */}
        <PinList mapRef={mapRef} pins={filteredPins} setSelectedPin={setSelectedPin} />
      </MapView>

      {/* 핀 바텀 시트 */}
      <PinBottomSheet selectedPin={selectedPin} setSelectedPin={setSelectedPin} />

      {/* 검색바 */}
      <SearchInput onSearch={handleSearch} />
      {/* 카테고리 */}
      <CategoryDropdown />

      {/* 현재위치 표시 */}
      <CurrentLocationButton onPress={goToCurrentLocation} visible={!!location} />
    </View>
  );
};

export default MapTab;
