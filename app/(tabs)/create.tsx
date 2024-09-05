import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormFiled from '@/components/FormFiled';
import { ResizeMode, Video } from 'expo-av';
import { icons } from '@/constants';
import CustomButton from '@/components/CustomButton';
// import { getDocumentAsync } from 'expo-document-picker';   // uploading from file explorer
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'; // uploading from gallery
import { router } from 'expo-router';
import { createVideo } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';

const Create = () => {
  const { user }: any = useGlobalContext();
  const [form, setForm] = useState<any>({
    title: '',
    prompt: '',
    video: null,
    thumbnail: null
  });
  const [uploading, setUploading] = useState(false);

  const openPicker = async (selectedType: string) => {
    /* UPLOAD FROM FILE EXPLORER */
    // const result = await getDocumentAsync({
    //   type: selectedType === 'thumbnail'
    //     ? ['image/png', 'image/jpg', 'image/jpeg']
    //     : ['video/mp4', 'video/gif', 'video/mpg']
    // });

    /* UPLOAD FROM GALLERY */
    const result = await launchImageLibraryAsync({
      mediaTypes: selectedType === 'thumbnail'
        ? MediaTypeOptions.Images
        : MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      setForm((prev: any) => ({
        ...prev,
        [selectedType]: result.assets[0]
      }));
    }
  };


  const submit = async () => {
    console.log(form, user.$id);
    if (!form.title || form.title.length === 0 || !form.prompt
      || form.title.length === 0 || !form.video || !form.thumbnail)
      return Alert.alert('Please fill in all the fields');

    setUploading(true);

    try {
      const result = await createVideo({ ...form, userId: user.$id });
      console.log(result);

      Alert.alert('Success', 'Post uploaded seccessfully.');
      router.push('/home');
    } catch (error: any) {
      console.log(error);
      Alert.alert('Error', error.message);
    } finally {
      setForm({
        title: '',
        prompt: '',
        video: null,
        thumbnail: null
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className='h-full bg-primary'>
      <ScrollView className='px-4 my-6'>
        <Text className='text-xl text-white font-psemibold'>Upload Video</Text>
        <FormFiled title='Video Title' placeholder='Give your video a catchy title..' otherStyle='mt-10'
          value={form.title} handleChange={(e: any) => setForm((prev: any) => ({ ...prev, title: e }))} />

        <View className='mt-7 space-y-2'>
          <Text className='text-base font-pmedium text-gray-100'>Upload Video</Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video
              ? <Video source={{ uri: form.video.uri }} resizeMode={ResizeMode.COVER}
                className='w-full h-64 rounded-2xl' />
              : <View className='w-full h-40 px-4 bg-black-100 items-center justify-center rounded-xl'>
                <View className='w-14 h-14 items-center justify-center border border-dashed border-secondary-100'>
                  <Image source={icons.upload} resizeMode='contain' className='w-1/2 h-1/2' />
                </View>
              </View>}
          </TouchableOpacity>
        </View>
        <View className='mt-7 space-y-2'>
          <Text className='text-base font-pmedium text-gray-100'>Thumbnail Image</Text>
          <TouchableOpacity onPress={() => openPicker('thumbnail')}>
            {form.thumbnail
              ? <Image source={{ uri: form.thumbnail.uri }} resizeMode='cover'
                className='w-full h-64 rounded-2xl' />
              : <View className='w-full h-16 px-4 bg-black-100 items-center justify-center rounded-xl border-2 border-black-200 flex-row space-x-2'>
                <Image source={icons.upload} resizeMode='contain' className='w-5 h-5' />
                <Text className='text-sm text-gray-100 font-pmedium'>Choose a file</Text>
              </View>}
          </TouchableOpacity>
        </View>
        <FormFiled title='Prompt' placeholder='AI prompt to generate the video..' otherStyle='mt-7'
          value={form.prompt} handleChange={(e: any) => setForm((prev: any) => ({ ...prev, prompt: e }))} />
        <CustomButton title='Submit & Publish' containerStyle='mt-7' isLoading={uploading}
          handlePress={submit} textStyle='font-psemibold' />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;