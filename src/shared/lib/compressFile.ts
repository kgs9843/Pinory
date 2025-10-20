import { Image as ImageCompressor, Video as VideoCompressor } from 'react-native-compressor';

export type CompressTarget = {
  uri: string;
  type: 'image' | 'video';
};

export const compressFile = async (
  file: CompressTarget,
  imageQuality = 0.7,
  maxVideoSizeMB = 5,
): Promise<string> => {
  try {
    if (file.type === 'image') {
      return await ImageCompressor.compress(file.uri, { quality: imageQuality });
    } else if (file.type === 'video') {
      return await VideoCompressor.compress(file.uri, {
        compressionMethod: 'auto',
        maxSize: maxVideoSizeMB * 1024 * 1024,
      });
    } else {
      // NOTE: 안전하게 원본 반환
      return file.uri;
    }
  } catch (err) {
    console.error('압축 실패:', file.uri, err);
    // NOTE: 실패 시 원본
    return file.uri;
  }
};
