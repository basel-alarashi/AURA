import { View, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '@/components/EmptyState';
import { getUserPosts, signOut, likeVideo, getCurrentUser } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import VideoCard from '@/components/VideoCard';
import { useGlobalContext } from '@/context/GlobalProvider';
import { icons } from '@/constants';
import InfoBox from '@/components/InfoBox';
import { router } from 'expo-router';

const Profile = () => {
  const { user, setUser, setIsLoggedIn }: any = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace('/(auth)/sign-in');
  };

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

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList data={posts ?? []} keyExtractor={(item: any) => item.$id} renderItem={({ item }: any) => (
        <VideoCard video={item} liked={
          item.likers?.map((liker: any) => liker.$id)?.includes(user.$id)}
          handleLikeDislike={(liked: boolean) => likeDislikeVideo(item, liked)} />
      )} ListHeaderComponent={() => (
        <View className='mt-6 mb-12 px-4 w-full items-center justify-center '>
          <TouchableOpacity className='items-end w-full mb-10' onPress={logout}>
            <Image source={icons.logout} resizeMode='contain' className='w-6 h-6' />
          </TouchableOpacity>
          <View className='w-16 h-16 items-center justify-center border border-gray-50 rounded-lg'>
            <Image source={{ uri: user?.avatar }} resizeMode='cover' className='w-full h-full rounded-lg' />
          </View>
          <View className='mt-5 flex-row '>
            <InfoBox title={posts?.length || 0} subtitle='Posts' containerStyle='mr-10' />
            <InfoBox title={user?.liked_posts?.length} subtitle='Likes' />
          </View>
        </View>
      )} ListEmptyComponent={() => (
        <EmptyState title='No Videos Found' subtitle='No videos found for you search.' />
      )} />
    </SafeAreaView>
  );
};

export default Profile;