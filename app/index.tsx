import { View, Text, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '@/components/CustomButton';
import 'react-native-url-polyfill/auto';

export default function App() {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='w-full h-full items-center justify-center px-4'>
          <Image source={images.logo} className='w-[130px] h-[84px]' resizeMode='contain' />
          <Image source={images.cards} className='w-full h-[300px] max-w-[380px]' resizeMode='contain' />
          <View className='relative mt-5'>
            <Text className='text-3xl text-white text-center font-bold'>
              Discover endless possibilities with
              <Text className='text-secondary-200'> Aora</Text>
            </Text>
            <Image source={images.path} resizeMode='contain'
              className='w-[136px] h-[15px] absolute -bottom-0 -right-8' />
          </View>
          <Text className='text-center text-sm font-pregular text-gray-100 mt-7'>
            Where creativity meets innovation: embark on a journey of limitless exploration with Aora
          </Text>
          <CustomButton title='Continue with email' handlePress={() => router.push('/sign-in')}
            containerStyle='w-full mt-7' />
        </View>
      </ScrollView>
      <StatusBar style='light' backgroundColor='#FFA001' />
    </SafeAreaView>
  );
}