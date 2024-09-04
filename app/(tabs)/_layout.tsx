import { View, Image, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Tabs } from "expo-router";
import { icons } from '../../constants';
import React from 'react';

const TabIcon = ({ icon, color, focused, name }: any) => (
  <View className='items-center justify-center gap-1'>
    <Image source={icon} resizeMode='contain' tintColor={color}
      className='w-6 h-6' />
    <Text className={`${focused? 'font-psemibold': 'font-pregular'} text-xs`}
      style={{ color: color }}>
      {name}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <React.Fragment>
      <Tabs screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          height: 64,
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533'
        }
      }}>
        <Tabs.Screen name='home' options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} focused={focused} name={'Home'} icon={icons.home} />
          )
        }} />
        <Tabs.Screen name='bookmark' options={{
          title: 'bookmark',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} focused={focused} name={'bookmark'} icon={icons.bookmark} />
          )
        }} />
        <Tabs.Screen name='create' options={{
          title: 'Create',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} focused={focused} name={'Create'} icon={icons.plus} />
          )
        }} />
        <Tabs.Screen name='profile' options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} focused={focused} name={'Profile'} icon={icons.profile} />
          )
        }} />
      </Tabs>
      <StatusBar style='light' backgroundColor='#FFA001' />
    </React.Fragment>
  );
};

export default TabsLayout;
