import { Image, Text, View, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormFiled from '@/components/FormFiled';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { getCurrentUser, signIn } from '../../lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';

const SignIn = () => {
  const { setUser, setIsLoggedIn }: any = useGlobalContext();
  const [form, setForm] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async () => {
    if (!form.email || form.password) {
      Alert.alert('Error', 'Please fill in all the fileds.');
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      
      const result = await getCurrentUser();

      setUser(result);
      setIsLoggedIn(true);

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
          <Text className='text-2xl text-white mt-10 font-psemibold'>Log in to Aora</Text>
          <FormFiled title='Email' value={form.email} otherStyle='mt-7' keyboardType='email-address'
            handleChange={(e: any) => setForm({ ...form, email: e })} placeholder='Email' />
          <FormFiled title='Password' value={form.password} otherStyle='mt-7'
            handleChange={(e: any) => setForm({ ...form, password: e })} placeholder='Password' />
          <CustomButton title='Sign In' handlePress={submitForm}
            containerStyle='mt-7' isLoading={isSubmitting} />
          <View className='justify-center flex-row gap-2 pt-5'>
            <Text className='text-lg text-gray-100 font-pregular'>Don't have an account?</Text>
            <Link href={'/(auth)/sign-up'} className='text-lg text-secondary font-psemibold'>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;