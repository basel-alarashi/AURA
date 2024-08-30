import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomButton = ({ title, handlePress, containerStyle, textStyle, isLoading }: any) => {
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={.7} disabled={isLoading}
        className={
            `bg-secondary rounded-xl min-h-[62px] items-center justify-center ${
            containerStyle} ${isLoading? 'opacity-50': null}`
        }>
        <Text className={`text-primary text-lg font-semibold ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;