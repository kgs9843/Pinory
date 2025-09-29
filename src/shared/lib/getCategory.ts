// TODO: 더미데이터 이므로 추후 수정 필요
import { categoryData } from '../config/dummyCategories';

export const getCategoryColor = (categoryId: string) => {
  const category = categoryData.find(c => c.id === categoryId);
  return category ? category.color : '#000000';
};

export const getCategoryName = (categoryId: string) => {
  const category = categoryData.find(c => c.id === categoryId);
  return category ? category.name : 'Unknown';
};
