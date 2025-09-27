import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import useLocation from '@shared/lib/useLocation';
import { useCategoryStore } from '@shared/store/useCategoryStore';

import CategoryDropdown from './CategoryDropdown';
import CurrentLocationButton from './CurrentLocationButton';
import MapError from './MapError';
import MapLoading from './MapLoading';
import PinList from './PinList';
import SearchInput from './SearchInput';
import { useFilteredPins } from '../model/useFilteredPins';
import { useMapControls } from '../model/useMapControls';
import { useSearchLocation } from '../model/useSearchLocation';

// NOTE: 기본 줌 레벨 (delta 값)
const DEFAULT_DELTA = {
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

// NOTE: 초기위치(서울 남부)
const defaultRegion = {
  latitude: 37.5729,
  longitude: 126.9794,
  ...DEFAULT_DELTA,
};

const MapScreen = () => {
  const mapRef = useRef<MapView>(null);
  const [retryCount, setRetryCount] = useState(0);
  const { location, loading, error } = useLocation(retryCount);
  const { handleSearch } = useSearchLocation(mapRef);
  const { goToCurrentLocation } = useMapControls(mapRef, location);
  const { expanded, selectedCategory } = useCategoryStore();

  // NOTE: 에러 화면 retry check
  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
  }, []);

  // NOTE: 마커 걸러주는 로직
  const filteredPins = useFilteredPins(selectedCategory);

  if (loading) {
    return <MapLoading />;
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
        scrollEnabled={!expanded}
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
        <PinList pins={filteredPins} />
      </MapView>

      {/* 검색바 */}
      <SearchInput onSearch={handleSearch} />
      {/* 카테고리 */}
      <CategoryDropdown />

      {/* 현재위치 표시 */}
      <CurrentLocationButton onPress={goToCurrentLocation} visible={!!location} />
    </View>
  );
};

export default MapScreen;
