import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { icons } from '../constants';

const FormFiled = ({ title, value, handleChange, otherStyle, keyboardType, placeholder }: any) => {
    const [showPassword, setshowPassword] = useState(false);

    return (
        <View className={'space-y-2 ' + otherStyle}>
            <Text className='text-base text-gray-100 font-pmedium'>
                {title}
            </Text>
            <View className='w-full h-16 relative'>
                <TextInput value={value} placeholder={placeholder} placeholderTextColor={'#7b7b8b'}
                    onChangeText={handleChange} secureTextEntry={title === 'Password' && !showPassword}
                    className='w-full h-full px-4 bg-black-100 border-black-200 border-2 rounded-2xl items-center caret-secondary text-base font-psemibold text-white focus:border-secondary' />
                {title === 'Password' &&
                    <TouchableOpacity className='absolute top-[30%] right-2'
                        onPress={() => setshowPassword(!showPassword)}>
                        <Image source={showPassword ? icons.eyeHide : icons.eye}
                            resizeMode='contain' className='w-6 h-6' />
                    </TouchableOpacity>}
            </View>
        </View>
    );
};

export default FormFiled;