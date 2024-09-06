import { View, Text, FlatList, Image, Alert } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '@/components/SearchInput';
import EmptyState from '@/components/EmptyState';
import VideoCard from '@/components/VideoCard';
import { useGlobalContext } from '@/context/GlobalProvider';
import { getCurrentUser, likeVideo } from '../../lib/appwrite';

const Bookmark = () => {
  const { user, setUser }: any = useGlobalContext();

  const likeDislikeVideo = async (video: any, liked: boolean) => {
    try {
      const newLikers = liked ? video.likers?.filter((liker: any) => liker.$id !== user.$id)
        : [...video.likers, user];

      const result = await likeVideo({ ...video, likers: newLikers });
      if (result) {
        getCurrentUser().then(res => {
          if (res) {
            setUser(res);
            Alert.alert('Success', `Video ${liked ? 'un' : ''}saved successfully.`);
          }
        }).catch(error => Alert.alert('Refresh Session Error', error.message));
      }
    } catch (error: any) {
      Alert.alert('Saving Video Error', error.message);
    }
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList data={user.liked_posts ?? []} keyExtractor={(item: any) => item.$id} renderItem={({ item }: any) => (
        <VideoCard video={item} page='bookmark' />
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