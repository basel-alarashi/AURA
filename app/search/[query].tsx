import { View, Text, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '@/components/SearchInput';
import EmptyState from '@/components/EmptyState';
import { searchPosts } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import VideoCard from '@/components/VideoCard';
import { useLocalSearchParams } from 'expo-router';

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList data={posts ?? []} keyExtractor={(item: any) => item.$id} renderItem={({ item }: any) => (
        <VideoCard video={item} />
      )} ListHeaderComponent={() => (
        <View className='my-6 px-4'>
          <Text className='text-sm text-gray-100 font-pmedium'>Search results for</Text>
          <Text className='text-2xl text-white font-psemibold'>{query}</Text>
          <View className='mt-6 mb-8'>
            <SearchInput value={query} placeholder='Search for a video topic' />
          </View>
        </View>
      )} ListEmptyComponent={() => (
        <EmptyState title='No Videos Found' subtitle='No videos found for you search.' />
      )} />
    </SafeAreaView>
  );
};

export default Search;