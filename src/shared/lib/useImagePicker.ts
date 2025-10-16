import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import { compressFile, CompressTarget } from '@shared/lib/compressFile';

interface Props {
  maxCount?: number;
  maxSizeMB?: number;
}

export function useImagePicker(initialFiles: string[] = [], options: Props = {}) {
  const [files, setFiles] = useState<string[]>(initialFiles);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickFiles = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      setLoading(true);

      console.log(result);

      if (!result.canceled) {
        // NOTE: 단일 파일입니다!
        // NOTE:  types: ("video" | "image" | "livePhoto" | "pairedVideo" | undefined)[]
        const asset = result.assets[0];
        if (!asset) {
          setError('* 파일을 선택하지 않았습니다.');
          return;
        }

        const { uri, type } = asset;

        // NOTE: 개수 제한
        if (options.maxCount && files.length + 1 > options.maxCount) {
          setError(`* 최대 ${options.maxCount}장까지 선택 가능합니다.`);
          return;
        }

        // NOTE: 용량 제한
        let filteredTarget: CompressTarget | null = null;
        if (options.maxSizeMB) {
          const fileInfo = await fetch(uri).then(res => res.blob());
          const sizeMB = fileInfo.size / 1024 / 1024;
          console.log('압축 전 용량(MB):', sizeMB);

          // NOTE: video, image만 가능
          if (sizeMB <= options.maxSizeMB && (type === 'image' || type === 'video')) {
            filteredTarget = { uri, type };
          } else {
            if (type === 'image') {
              setError(`* 이미지 용량은 ${options.maxSizeMB}MB 이하만 가능합니다.`);
            } else if (type === 'video') {
              setError(`* 비디오 용량은 ${options.maxSizeMB}MB 이하만 가능합니다.`);
            } else {
              setError(`* 용량이 ${options.maxSizeMB}MB를 초과하는 파일이 있습니다.`);
            }
            return;
          }

          // NOTE: 압축
          const compressedUri = await compressFile(filteredTarget);
          const compressedFileInfo = await fetch(compressedUri).then(res => res.blob());
          const compressedSizeMB = compressedFileInfo.size / 1024 / 1024;
          console.log('압축 후 용량(MB):', compressedSizeMB);

          // NOTE: setFile에 압축된 URI 저장
          setFiles(prev => [...prev, compressedUri]);
          setError(null);
        }
      }
    } catch (error) {
      console.error(error);
      // setError('* 파일 선택 또는 압축 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
  const removeFile = (uri: string) => {
    setFiles(prev => prev.filter(img => img !== uri));
  };

  return {
    files,
    pickFiles,
    loading,
    error,
    setError,
    removeFile,
  };
}
