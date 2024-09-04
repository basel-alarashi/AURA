import { View, Text } from 'react-native';
import React from 'react';

const InfoBox = ({ title, subtitle, containerStyle }: any) => {
  return (
    <View className={containerStyle}>
      <Text className='text-white text-xl text-center font-psemibold'>{title}</Text>
      <Text className='text-sm text-gray-100 text-center font-pregular'>{subtitle}</Text>
    </View>
  );
};

export default InfoBox;