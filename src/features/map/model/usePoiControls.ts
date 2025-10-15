import { useState } from 'react';
import { PoiClickEvent } from 'react-native-maps';

import { Pin, Poi } from '@entities/pin/model/types';

interface UsePoiClickReturn {
  selectedPoi: Poi | null;
  handlePoiClick: (event: PoiClickEvent) => void;
  clearPoi: () => void;
}

interface Props {
  setSelectedPin: React.Dispatch<React.SetStateAction<Pin | null>>;
}

const usePoiControls = ({ setSelectedPin }: Props): UsePoiClickReturn => {
  const [selectedPoi, setSelectedPoi] = useState<Poi | null>(null);

  const handlePoiClick = (event: PoiClickEvent) => {
    const { name, placeId, coordinate } = event.nativeEvent;

    if (setSelectedPin) {
      setSelectedPin(null);
    }

    setSelectedPoi({
      name,
      id: placeId,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
  };

  const clearPoi = () => setSelectedPoi(null);

  return { selectedPoi, handlePoiClick, clearPoi };
};

export default usePoiControls;
