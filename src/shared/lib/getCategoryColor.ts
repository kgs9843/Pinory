import { categoryData } from '../config/dummyCategories';

export const getCategoryColor = (categoryId: number) => {
  const category = categoryData.find(c => c.id === categoryId);
  return category ? category.color : '#000000';
};
