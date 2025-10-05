import * as Location from 'expo-location';

import { Coords } from '../types';

// NOTE: 주소 문자열로 위도/경도 가져오기
export async function getCoordinatesFromAddress(address: string): Promise<Coords | null> {
  try {
    const result = await Location.geocodeAsync(address.trim());
    if (result.length > 0) {
      const { latitude, longitude } = result[0];
      return { latitude, longitude };
    }
    return null;
  } catch (error) {
    console.error('getCoordinatesFromAddress error:', error);
    return null;
  }
}

// NOTE: 위도/경도로 주소(지역) 가져오기
export async function getAddressFromCoordinates(
  latitude: number,
  longitude: number,
): Promise<string | null> {
  try {
    const result = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (result.length > 0) {
      const place = result[0];
      // NOTE: android만 가능한 조합입니다!
      const address = [place.formattedAddress].filter(Boolean).join(' ');
      return address;
    }
    return null;
  } catch (error) {
    console.error('getAddressFromCoordinates error:', error);
    return null;
  }
}
