import MapView from 'react-native-maps';
import { create } from 'zustand';

interface MapStore {
  mapRef: React.RefObject<MapView | null>;
  setMapRef: (ref: React.RefObject<MapView | null>) => void;
}

export const useMapStore = create<MapStore>(set => ({
  mapRef: { current: null },
  setMapRef: ref => set({ mapRef: ref }),
}));
