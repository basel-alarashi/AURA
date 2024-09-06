import { View, Text, FlatList, Image, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '@/components/SearchInput';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';
import { getAllPosts, getLatestPosts } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import VideoCard from '@/components/VideoCard';
import { useGlobalContext } from '@/context/GlobalProvider';

const Bookmark = () => {
  const { user }: any = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(getAllPosts);

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList data={posts ?? []} keyExtractor={(item: any) => item.$id} renderItem={({ item }: any) => (
        <VideoCard video={item} />
      )} ListHeaderComponent={() => (
        <View className='my-6 px-4 space-y-6'>
          <View className='mb-6 flex-row items-start justify-between'>
            <Text className='text-2xl text-white font-psemibold mt-2'>Saved Videos</Text>
            <View className='mt-1.5'>
              <Image source={images.logoSmall} className='w-9 h-10' resizeMode='contain' />
            </View>
          </View>
          <SearchInput placeholder='Search your saved videos' />
        </View>
      )} ListEmptyComponent={() => (
        <EmptyState title='No Videos Found' subtitle='Be the first one to upload a video.' />
      )} />
    </SafeAreaView>
  );
};

export default Bookmark;