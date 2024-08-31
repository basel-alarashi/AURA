import { Image, Text, View, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormFiled from '@/components/FormFiled';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '@/lib/appwrite';

const SignUp = () => {
  const [form, setForm] = useState({ email: '', password: '', username: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async () => {
    if (!form.email || form.password || form.username) {
      Alert.alert('Error', 'Please fill in all the fileds.');
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      // set it to global state
      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full min-h-[93vh] justify-center px-4 my-6'>
          <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]' />
          <Text className='text-2xl text-white mt-10 font-psemibold'>Sign up to Aora</Text>
          <FormFiled title='User Name' value={form.username} otherStyle='mt-7'
            handleChange={(e: any) => setForm({ ...form, username: e })} placeholder='User Name' />
          <FormFiled title='Email' value={form.email} otherStyle='mt-7' keyboardType='email-address'
            handleChange={(e: any) => setForm({ ...form, email: e })} placeholder='Email' />
          <FormFiled title='Password' value={form.password} otherStyle='mt-7'
            handleChange={(e: any) => setForm({ ...form, password: e })} placeholder='Password' />
          <CustomButton title='Sign Up' handlePress={submitForm}
            containerStyle='mt-7' isLoading={isSubmitting} />
          <View className='justify-center flex-row gap-2 pt-5'>
            <Text className='text-lg text-gray-100 font-pregular'>Already have an account?</Text>
            <Link href={'/(auth)/sign-in'} className='text-lg text-secondary font-psemibold'>Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;