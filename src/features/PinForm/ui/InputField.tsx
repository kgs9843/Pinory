import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
  label: string;
  value: string;
  setValue: (text: string) => void;
  maxLength: number;
  multiline?: boolean;
}

const InputField = ({
  label,
  value,
  setValue,
  maxLength,
  multiline = false,
  ...rest
}: InputFieldProps) => {
  return (
    <View className="mb-4 flex-col">
      <Text className="mb-1 font-semibold">
        {label} <Text className="color-red-600">*</Text>
      </Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        maxLength={maxLength}
        multiline={multiline}
        className={`rounded-lg border border-gray-300 p-2 ${multiline ? 'h-32' : ''}`}
        style={multiline ? { textAlignVertical: 'top' } : undefined}
        {...rest}
      />
      <Text className="text-right text-gray-400">
        {value.length}/{maxLength}
      </Text>
    </View>
  );
};

export default InputField;
