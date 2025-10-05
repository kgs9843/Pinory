import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

interface Props {
  maxCount?: number;
  maxSizeMB?: number;
}

export function useImagePicker(initialImages: string[] = [], options: Props = {}) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        const selectedUris = result.assets.map(a => a.uri);

        // 개수 제한
        if (options.maxCount && images.length + selectedUris.length > options.maxCount) {
          setError(`* 최대 ${options.maxCount}장까지 선택 가능합니다.`);
          setLoading(false);
          return;
        }

        // 용량 제한
        if (options.maxSizeMB) {
          // NOTE: Expo ImagePicker는 fileSize를 기본 제공하지 않아서 getInfo를 사용
          const filteredUris: string[] = [];
          for (const uri of selectedUris) {
            const fileInfo = await fetch(uri).then(res => res.blob());
            const sizeMB = fileInfo.size / 1024 / 1024;
            if (sizeMB <= options.maxSizeMB) filteredUris.push(uri);
          }

          if (filteredUris.length === 0) {
            setError(`* 이미지 용량은 ${options.maxSizeMB}MB 이하만 가능합니다.`);
            setLoading(false);
            return;
          }

          setImages(prev => [...prev, ...filteredUris]);
        } else {
          setImages(prev => [...prev, ...selectedUris]);
        }
      }
    } catch (error) {
      console.error('Image picking failed:', error);
    }
  };
  const removeImage = (uri: string) => {
    setImages(prev => prev.filter(img => img !== uri));
  };

  return {
    images,
    pickImages,
    loading,
    error,
    setError,
    removeImage,
  };
}
