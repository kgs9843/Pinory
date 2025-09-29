import React, { RefObject } from 'react';
import MapView, { Marker } from 'react-native-maps';

import { getCategoryColor } from '@/src/shared/lib/getCategory';

import { Pin } from '@entities/pin/model/types';


const CAMERA_OFFSET_LATITUDE = 0.015; // 위도차
const CAMERA_DELTA = 0.04;
const CAMERA_ANIMATION_DURATION = 500; // ms

interface Props {
  pins: Pin[];
  setSelectedPin: React.Dispatch<React.SetStateAction<Pin | null>>;
  mapRef: RefObject<MapView | null>;
}

// TODO: 추후에 기본 색깔 수정과 커스텀 핀
// ISSUE: CallOut 이슈 reference: https://github.com/react-native-maps/react-native-maps/issues/5216

const PinList = ({ mapRef, pins, setSelectedPin }: Props) => {
  // NOTE: 카메라 이동 커스텀
  const handleMarkerPress = (pin: Pin) => {
    const region = {
      latitude: pin.latitude - CAMERA_OFFSET_LATITUDE,
      longitude: pin.longitude,
      latitudeDelta: CAMERA_DELTA,
      longitudeDelta: CAMERA_DELTA,
    };
    if (mapRef) {
      mapRef.current?.animateToRegion(region, CAMERA_ANIMATION_DURATION);
      setSelectedPin(pin);
    }
    return;
  };

  return (
    <>
      {pins.map(pin => (
        <Marker
          key={pin.id}
          coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
          pinColor={getCategoryColor(pin.categoryId)}
          title={pin.title}
          onPress={() => handleMarkerPress(pin)}
        />
      ))}
    </>
  );
};

export default PinList;
