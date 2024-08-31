import { View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { icons } from '../constants';

const SearchInput = ({ value, handleChange }: any) => {
    const [showPassword, setshowPassword] = useState(false);

    return (
        <View className='w-full h-16 relative'>
            <TextInput value={value} placeholder={'Search for a video topic'} placeholderTextColor={'#7b7b8b'}
                onChangeText={handleChange}
                className='w-full h-full px-4 mt-1 flex-1 bg-black-100 border-black-200 border-2 rounded-2xl items-center caret-secondary text-base font-pregular text-white focus:border-secondary space-x-4' />
            <TouchableOpacity className='absolute top-6 right-2'
                onPress={() => setshowPassword(!showPassword)}>
                <Image source={icons.search}
                    resizeMode='contain' className='w-5 h-5' />
            </TouchableOpacity>
        </View>
    );
};

export default SearchInput;