import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import useLocation from '@shared/lib/useLocation';
import { useCategoryStore } from '@shared/store/useCategoryStore';

import CategoryDropdown from './CategoryDropdown';
import CurrentLocationButton from './CurrentLocationButton';
import MapError from './MapError';
import MapLoading from './MapLoading';
import SearchInput from './SearchInput';
import { useMapControls } from '../model/useMapControls';
import { useSearchLocation } from '../model/useSearchLocation';

// NOTE: 초기위치(서울 남부)
const defaultRegion = {
  latitude: 37.5729,
  longitude: 126.9794,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const MapScreen = () => {
  const mapRef = useRef<MapView>(null);
  const [retryCount, setRetryCount] = useState(0);
  const { location, loading, error } = useLocation(retryCount);
  const { searchLocation, handleSearch } = useSearchLocation(mapRef);
  const { goToCurrentLocation } = useMapControls(mapRef, location);
  const expanded = useCategoryStore(state => state.expanded);

  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
  }, []);

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
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : defaultRegion
        }
      >
        {searchLocation && <Marker coordinate={searchLocation} pinColor="blue" title="검색 위치" />}
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
