import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  PinDetail: { pinId: string };
  PinForm: { pinId: string };
  Setting: undefined;
};

export type RootNavigationProp<T extends keyof RootStackParamList> = NativeStackNavigationProp<
  RootStackParamList,
  T
>;

// NOTE: PinDetailScreenProps 은 route 기능을 사용해야됨
export type PinDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'PinDetail'>;

// NOTE: PinFormScreenProps 은 route 기능을 사용해야됨
export type PinFromScreenProps = NativeStackScreenProps<RootStackParamList, 'PinForm'>;
