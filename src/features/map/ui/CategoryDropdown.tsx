import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal } from 'react-native';

import { useCategoryStore } from '@shared/store/useCategoryStore';
import { ShadowStyles } from '@shared/ui/shadow';

const CategoryDropdown = () => {
  const { expanded, categories, toggleExpanded, selectCategory } = useCategoryStore();

  return (
    <View className="absolute bottom-[180px] right-4 z-10">
      {/* 버튼 */}
      <TouchableOpacity
        className="flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white"
        style={ShadowStyles.shadowMd}
        onPress={toggleExpanded}
      >
        <Text>{expanded ? '▼' : '▲'}</Text>
      </TouchableOpacity>

      {/* 모달 */}
      <Modal visible={expanded} transparent animationType="none" onRequestClose={toggleExpanded}>
        {/* 배경 클릭 시 닫기 */}
        <TouchableOpacity
          className="flex-1 bg-transparent"
          activeOpacity={1}
          onPress={toggleExpanded}
        >
          {/* 드롭다운 컨테이너 */}
          <View
            style={ShadowStyles.shadowMd}
            className="absolute bottom-[220px] right-4 h-[180px] w-[120px] flex-1 rounded-md bg-white"
          >
            <FlatList
              data={categories}
              keyExtractor={item => item.id.toString()} // id는 숫자일 수 있으므로 toString
              scrollEnabled={true}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="flex-row items-center px-4 py-4"
                  onPress={() => selectCategory(item)}
                >
                  {/* 색깔 표시 */}
                  <View
                    className="mr-[8px] h-[16px] w-[16px] rounded-full"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />
                  {/* 이름 표시 */}
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CategoryDropdown;
