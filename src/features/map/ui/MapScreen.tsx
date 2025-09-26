import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import useLocation from '@shared/lib/useLocation';

const defaultRegion = {
  latitude: 37.5729,
  longitude: 126.9794,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const MapScreen = () => {
  const { location, loading, error } = useLocation();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-4">위치 정보를 불러오는 중...</Text>
      </View>
    );
  }

  if (error) {
    console.log(error);
  }

  return (
    <MapView
      style={StyleSheet.absoluteFill}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      showsMyLocationButton
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
      {/* {location && (
        <Marker
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title="현재 위치"
          description="현재 사용자 위치"
        />
      )} */}
    </MapView>
  );
};

export default MapScreen;
