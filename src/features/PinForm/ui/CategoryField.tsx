import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { fetchCategoriesFromFirestore } from '@entities/category/model/fetchCategoriesFromFirestore';
import { SaveCategoryToFirestore } from '@entities/category/model/saveCategoryToFireStore';
import { Category } from '@entities/category/model/type';

import LoadingSpinner from '@shared/ui/LoadingSpinner';

import NewCategoryModal from './NewCategoryModal';

const CategoryField = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  // NOTE: Firestore에서 카테고리 불러오기
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategoriesFromFirestore();
        setCategories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, [isModalVisible]);

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
  };

  const handleAddCategory = async (name: string, color: string) => {
    console.log('새 카테고리 추가:', name, color);
    try {
      await SaveCategoryToFirestore(name, color);
      console.log('✅ 성공', '새 카테고리가 추가되었습니다.');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View className="mb-4 flex-col rounded-2xl border border-gray-200 p-4">
      <Text className="mb-4 font-semibold">
        카테고리 <Text className="color-red-600">*</Text>
      </Text>

      {loading ? (
        <LoadingSpinner />
      ) : (
        // NOTE: 카테고리 버튼 리스트
        <View className="flex-row flex-wrap gap-3">
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              onPress={() => handleCategorySelect(category.id)}
              className={`flex-row items-center rounded-xl border px-4 py-2 ${
                selectedCategory === category.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <View
                className="mr-2 h-3 w-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <Text>{category.name}</Text>
            </TouchableOpacity>
          ))}

          {/* 새 카테고리 추가 버튼 */}
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="rounded-xl border-2 border-dashed border-gray-300 px-4 py-2"
          >
            <Text className="text-gray-500">+ 새 카테고리 만들기</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 모달 컴포넌트 */}
      <NewCategoryModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddCategory}
      />
    </View>
  );
};

export default CategoryField;
