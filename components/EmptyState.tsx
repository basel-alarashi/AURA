import { View, Text, Image } from 'react-native';
import React from 'react';
import { images } from '@/constants';
import CustomButton from './CustomButton';
import { router } from 'expo-router';

const EmptyState = ({ title, subtitle }: any) => {
    return (
        <View className='px-4 items-center justify-center'>
            <Image source={images.empty} resizeMode='contain' className='w-[270px] h-[215px]' />
            <Text className='text-xl text-white font-psemibold'>{title}</Text>
            <Text className='text-sm text-gray-100 font-pmedium'>{subtitle}</Text>
            <CustomButton title='Create video' handlePress={() => router.push('/create')}
            containerStyle='w-full my-5' />
        </View>
    );
};

export default EmptyState;