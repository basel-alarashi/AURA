import { View, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { icons } from '../constants';
import { router, usePathname } from 'expo-router';

const SearchInput = () => {
    const pathname = usePathname();
    const [query, setQuery] = useState('');

    return (
        <View className='w-full h-16 relative'>
            <TextInput value={query} placeholder={'Search for a video topic'}
                placeholderTextColor={'#CDCDE0'} onChangeText={(e) => setQuery(e)}
                className='w-full h-full px-4 mt-1 flex-1 bg-black-100 border-black-200 border-2 rounded-2xl items-center caret-secondary text-base font-pregular text-white focus:border-secondary space-x-4' />
            <TouchableOpacity className='absolute top-6 right-2'
                onPress={() => {
                    if (!query) {
                        return Alert.alert('Missing Query', 'Please input something to search result accross database.');
                    }

                    if (pathname.startsWith('/search')) {
                        router.setParams({ query });
                    } else {
                        router.push(`/search/${query}`);
                    }
                }}>
                <Image source={icons.search}
                    resizeMode='contain' className='w-5 h-5' />
            </TouchableOpacity>
        </View>
    );
};

export default SearchInput;