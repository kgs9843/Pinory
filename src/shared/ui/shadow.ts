import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  shadowMd: {
    // NOTE: iOS 그림자 스타일
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,

    // NOTE: Android 그림자 스타일 (Elevation)
    elevation: 6,
  },
});

export const ShadowStyles = commonStyles;

export const shadowMd = commonStyles.shadowMd;
