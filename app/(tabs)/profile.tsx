import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '@/components/EmptyState';
import { getUserPosts, signOut } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import VideoCard from '@/components/VideoCard';
import { useGlobalContext } from '@/context/GlobalProvider';
import { icons } from '@/constants';
import InfoBox from '@/components/InfoBox';
import { router } from 'expo-router';

const Profile = () => {
  const { user, setUser, setIsLoggedIn }: any = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace('/(auth)/sign-in');
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList data={posts ?? []} keyExtractor={(item: any) => item.$id} renderItem={({ item }: any) => (
        <VideoCard video={item} />
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
            <InfoBox title='1.2K' subtitle='Followers' />
          </View>
        </View>
      )} ListEmptyComponent={() => (
        <EmptyState title='No Videos Found' subtitle='No videos found for you search.' />
      )} />
    </SafeAreaView>
  );
};

export default Profile;