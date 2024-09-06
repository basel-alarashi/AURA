import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '@/components/SearchInput';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';
import { getAllPosts, getLatestPosts, likeVideo, getCurrentUser } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import VideoCard from '@/components/VideoCard';
import { useGlobalContext } from '@/context/GlobalProvider';

const Home = () => {
  const { user, setUser }: any = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const likeDislikeVideo = async (video: any, liked: boolean) => {
    try {
      const newLikers = liked ? video.likers?.filter((liker: any) => liker.$id !== user.$id)
        : [...video.likers, user];

      const result = await likeVideo({ ...video, likers: newLikers });
      if (result) {
        getCurrentUser().then(res => {
          if (res) {
            setUser(res);
            refetch();
            Alert.alert('Success', `Video ${liked ? 'un' : ''}saved successfully.`);
          }
        }).catch(error => Alert.alert('Refresh Session Error', error.message));
      }
    } catch (error: any) {
      Alert.alert('Saving Video Error', error.message);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);

    await refetch();

    setRefreshing(false);
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList data={posts ?? []} keyExtractor={(item: any) => item.$id} renderItem={({ item }: any) => (
        <VideoCard video={item} liked={
          item.likers?.map((liker: any) => liker.$id)?.includes(user.$id)}
          handleLikeDislike={(liked: boolean) => likeDislikeVideo(item, liked)} />
      )} ListHeaderComponent={() => (
        <View className='my-6 px-4 space-y-6'>
          <View className='mb-6 flex-row items-start justify-between'>
            <View>
              <Text className='text-sm text-gray-100 font-pmedium'>Welcome Back</Text>
              <Text className='text-2xl text-white font-psemibold'>{user?.username}</Text>
            </View>
            <View className='mt-1.5'>
              <Image source={images.logoSmall} className='w-9 h-10' resizeMode='contain' />
            </View>
          </View>
          <SearchInput placeholder='Search for a video topic' />
          <View className='w-full flex-1 pt-5 pb-8'>
            <Text className='text-gray-100 text-lg mb-3 font-pregular'>Latest Videos</Text>
            <Trending posts={latestPosts ?? []} />
          </View>
        </View>
      )} ListEmptyComponent={() => (
        <EmptyState title='No Videos Found' subtitle='Be the first one to upload a video.' />
      )} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} />
    </SafeAreaView>
  );
};

export default Home;