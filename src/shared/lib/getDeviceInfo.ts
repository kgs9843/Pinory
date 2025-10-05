import { Dimensions } from 'react-native';

export const deviceWidth = Dimensions.get('window').width;

// TODO: 추후 prebuild 하면 https://github.com/Sunhat/react-native-extra-dimensions-android 이거 사용해 디바이스 높이를 통해 모달 가리기
// export const deviceHeight =
//   Platform.OS === 'ios'
//     ? Dimensions.get('window').height
//     : require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT');
