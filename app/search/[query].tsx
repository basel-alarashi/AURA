import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
  const { query } = useLocalSearchParams();

  return (
    <SafeAreaView className='bg-primary h-full'>
      <Text className='text-white text-xl'>{query}</Text>
    </SafeAreaView>
  );
};

export default Search;