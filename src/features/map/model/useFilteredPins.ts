import { useMemo } from 'react';

import { pins } from '@shared/config/dummyPins';
import { Category } from '@shared/types';

export const useFilteredPins = (selectedCategory: Category | null) => {
  return useMemo(() => {
    if (!selectedCategory || selectedCategory.id === 0) {
      return pins;
    }
    return pins.filter(pin => pin.categoryId === selectedCategory.id);
  }, [selectedCategory]);
};
