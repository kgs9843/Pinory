import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
  label: string;
  value: string;
  setValue: (text: string) => void;
  maxLength: number;
  multiline?: boolean;
  error?: string;
}

const InputField = ({
  label,
  value,
  setValue,
  maxLength,
  multiline = false,
  error,
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
      <View className="relative w-full flex-row px-2">
        {error ? <Text className="mt-1 text-sm text-red-500">{error}</Text> : null}
        <Text className="absolute right-2 text-gray-400">
          {value.length}/{maxLength}
        </Text>
      </View>
    </View>
  );
};

export default InputField;
