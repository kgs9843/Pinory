import React from 'react';
import { Marker } from 'react-native-maps';

import { categoryData } from '@shared/config/dummyCategories';
import { Pin } from '@shared/types';

interface Props {
  pins: Pin[];
}

// TODO: 추후에 기본 색깔 수정과 커스텀 핀
const PinList = ({ pins }: Props) => {
  const getCategoryColor = (categoryId: number) => {
    const category = categoryData.find(c => c.id === categoryId);
    return category ? category.color : '#000000';
  };

  return (
    <>
      {pins.map(pin => (
        <Marker
          key={pin.id}
          coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
          pinColor={getCategoryColor(pin.categoryId)}
          title={pin.title}
        />
      ))}
    </>
  );
};

export default PinList;
