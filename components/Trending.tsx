import { View, Text, FlatList } from 'react-native';
import React from 'react';

const Trending = ({ posts }: any) => {
  return (
    <FlatList data={posts} keyExtractor={(item) => item.id} renderItem={({ item }: any) => (
      <Text className='text-2xl text-white font-psemibold'>{item.id}</Text>
    )} horizontal />
  );
};

export default Trending;