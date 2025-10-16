import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

import LoadingSpinner from '@shared/ui/LoadingSpinner';

interface Props {
  files: string[];
  error?: string | null;
  maxCount: number;
  pickFiles: () => void;
  removeFile: (uri: string) => void;
  loading: boolean;
}

const ImagePickerSection = ({ files, error, maxCount, pickFiles, removeFile, loading }: Props) => {
  return (
    <View className="mb-4 flex-col rounded-2xl border border-gray-200 p-4">
      <View className="mb-4 w-full flex-row justify-between">
        <Text className="font-semibold">사진 추가 </Text>
        <Text className="font-semibold">선택사항</Text>
      </View>
      <ScrollView horizontal className="mb-4 flex-row gap-2">
        {files.map((uri, idx) => (
          <View key={idx}>
            <Image source={{ uri }} className="mr-1 h-[100px] w-[100px] rounded-lg" />
            <TouchableOpacity
              className="absolute right-[6px] top-[6px] flex h-5 w-5 items-center justify-center rounded-full bg-white"
              onPress={() => removeFile(uri)}
            >
              <Text>x</Text>
            </TouchableOpacity>
          </View>
        ))}
        {/* 로딩 중 화면 */}
        {loading ? (
          <View className="mr-1 h-[100px] w-[100px] rounded-lg border-2 border-gray-300">
            <LoadingSpinner />
          </View>
        ) : (
          <>
            {files.length < maxCount ? (
              <TouchableOpacity
                onPress={pickFiles}
                className="ml-2 h-[100px] w-[100px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300"
              >
                <Text>+</Text>
                <Text>사진 추가</Text>
              </TouchableOpacity>
            ) : null}
          </>
        )}
      </ScrollView>
      <View className="mt-1 w-full flex-row justify-between">
        {error && <Text className="mb-2 text-red-500">{error}</Text>}
        <View />
        <Text className="text-gray-500">
          {files.length} / {maxCount}장 선택
        </Text>
      </View>
    </View>
  );
};

export default ImagePickerSection;
