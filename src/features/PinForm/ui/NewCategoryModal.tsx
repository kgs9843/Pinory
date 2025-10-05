import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

import { categoryData } from '@shared/config/dummyCategories';
import ModalLayout from '@shared/ui/ModalLayout';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onAdd: (name: string, color: string) => void;
}

const NewCategoryModal = ({ isVisible, onClose, onAdd }: Props) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleAdd = () => {
    if (!newCategoryName || !selectedColor) {
      return;
    }
    onAdd(newCategoryName, selectedColor);
    setNewCategoryName('');
    setSelectedColor(null);
    onClose();
  };

  return (
    <ModalLayout isVisible={isVisible} onClose={onClose}>
      <View className="w-[80%] rounded-2xl bg-white p-4">
        {/* 헤더 */}
        <View className="mb-4 flex-row items-center justify-between border-b border-gray-300 pb-6">
          <TouchableOpacity
            onPress={() => {
              setNewCategoryName('');
              setSelectedColor(null);
              onClose();
            }}
          >
            <Text className="text-gray-500">취소</Text>
          </TouchableOpacity>
          <Text className="text-xl font-semibold">새 카테고리</Text>
          <TouchableOpacity onPress={handleAdd}>
            <Text className="text-blue-500">추가</Text>
          </TouchableOpacity>
        </View>

        {/* 카테고리 이름 입력 */}
        <View className="mb-4">
          <Text className="mb-2">카테고리 이름</Text>
          <TextInput
            value={newCategoryName}
            onChangeText={setNewCategoryName}
            placeholder="카테고리 이름을 입력하세요"
            className="rounded-md border border-gray-300 px-3 py-2"
          />
        </View>

        {/* 색상 선택 */}
        <View>
          <Text className="mb-4">색상 선택</Text>
          <View className="flex-row flex-wrap">
            {categoryData.map(category => (
              <View
                key={category.id}
                className="flex h-[50px] items-center justify-center"
                style={{ width: '25%' }}
              >
                <TouchableOpacity
                  onPress={() => setSelectedColor(category.color)}
                  className={`mb-2 h-10 w-10 items-center justify-center rounded-full ${
                    selectedColor === category.color ? 'h-12 w-12 border-2 border-gray-400' : ''
                  }`}
                  style={{
                    backgroundColor: category.color,
                  }}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    </ModalLayout>
  );
};

export default NewCategoryModal;
