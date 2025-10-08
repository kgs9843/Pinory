import { create } from 'zustand';

import { Coords } from '../types';

interface LocationState {
  location: Coords | null;
  retryCount: number;
  setLocation: (coords: Coords | null) => void;
  setRetryCount: () => void;
}

export const useLocationStore = create<LocationState>(set => ({
  location: null,
  retryCount: 0,
  setLocation: location => set({ location }),
  setRetryCount: () => set(state => ({ retryCount: state.retryCount + 1 })),
}));
