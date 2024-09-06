import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants';
import { Video, ResizeMode } from 'expo-av';

const VideoCard = ({ video: {
  title, thumbnail, video_link, creator: { username, avatar }
}, liked, handleLikeDislike }: any) => {
  const [play, setPlay] = useState<boolean>(false);

  return (
    <View className='px-4 mb-14 flex-col items-center'>
      <View className='flex-row items-start gap-3'>
        <View className='flex-row flex-1 items-center justify-center'>
          <View className='w-[46px] h-[46px] p-0.5 items-center justify-center border border-secondary rounded-lg'>
            <Image source={{ uri: avatar }} className='w-full h-full rounded-lg' resizeMode='cover' />
          </View>
          <View className='flex-1 justify-center gap-y-1 ml-3'>
            <Text className='text-white font-psemibold text-sm' numberOfLines={1}>{title}</Text>
            <Text className='text-xs font-pregular text-gray-100' numberOfLines={1}>{username}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleLikeDislike} className='pt-2'>
          <Image source={liked ? icons.liked : icons.unliked} resizeMode='contain' className='w-5 h-5' />
        </TouchableOpacity>
      </View>
      {play ?
        <Video source={{ uri: video_link }} resizeMode={ResizeMode.CONTAIN}
          className='w-full h-60 mt-3 rounded-xl'
          useNativeControls shouldPlay onPlaybackStatusUpdate={(status: any) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }} /> : <TouchableOpacity
            className='w-full h-60 rounded-xl mt-3 relative items-center justify-center'
            activeOpacity={.7} onPress={() => setPlay(true)}>
          <Image source={{ uri: thumbnail }} resizeMode='cover' className='w-full h-full mt-3 rounded-xl' />
          <Image source={icons.play} resizeMode='contain' className='absolute w-12 h-12 ' />
        </TouchableOpacity>}
    </View>
  );
};

export default VideoCard;