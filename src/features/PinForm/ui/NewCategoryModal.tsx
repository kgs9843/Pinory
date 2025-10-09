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

  const [nameError, setNameError] = useState('');
  const [colorError, setColorError] = useState('');

  const handleAdd = () => {
    let hasError = false;

    if (!newCategoryName.trim()) {
      setNameError('* 카테고리 이름을 입력해주세요.');
      hasError = true;
    } else {
      setNameError('');
    }

    if (!selectedColor) {
      setColorError('* 카테고리 색상을 선택해주세요.');
      hasError = true;
    } else {
      setColorError('');
    }

    if (hasError) return;

    // NOTE: 오류 없으면 추가
    onAdd(newCategoryName, selectedColor!);
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
              setNameError('');
              setColorError('');
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
          <View className="w-full flex-row">
            <TextInput
              value={newCategoryName}
              onChangeText={setNewCategoryName}
              maxLength={10}
              onChange={() => setNameError('')}
              placeholderTextColor={'#ccc'}
              placeholder="카테고리 이름을 입력하세요"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
            <View className="absolute right-2 h-full items-center justify-center">
              <Text className="text-sm text-gray-400">{`${newCategoryName.length}/10`}</Text>
            </View>
          </View>
          {nameError ? <Text className="mt-1 text-sm text-red-500">{nameError}</Text> : null}
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
                  onPress={() => {
                    setSelectedColor(category.color);
                    setColorError('');
                  }}
                  className={`mb-2 h-10 w-10 items-center justify-center rounded-full ${
                    selectedColor === category.color ? 'h-12 w-12 border-2 border-gray-400' : ''
                  }`}
                  style={{
                    backgroundColor: category.color,
                  }}
                />
              </View>
            ))}
            {colorError ? <Text className="mt-1 text-sm text-red-500">{colorError}</Text> : null}
          </View>
        </View>
      </View>
    </ModalLayout>
  );
};

export default NewCategoryModal;
