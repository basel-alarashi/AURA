import { Image, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { icons } from '@/constants';
import { Video, ResizeMode } from 'expo-av';

const zoomIn = {
  0: { scale: .9 },
  1: { scale: 1 }
};

const zoomOut = {
  0: { scale: 1 },
  1: { scale: .9 }
};

const TrendingItem = ({ item, activeItem }: any) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View className='mr-5' duration={400}
      animation={activeItem === item.$id ? zoomIn: zoomOut}>
        {play ?
        <Video source={{ uri: item.video_link }} resizeMode={ResizeMode.CONTAIN}
          className='w-52 h-72 mt-3 rounded-[35px] bg-white/10'
          useNativeControls shouldPlay onPlaybackStatusUpdate={(status: any) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }} /> :
        <TouchableOpacity className='relative items-center justify-center'
          activeOpacity={.7} onPress={() => setPlay(true)}>
          <ImageBackground source={{ uri: item.thumbnail }} resizeMode='cover'
            className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40' />
          <Image source={icons.play} resizeMode='contain' className='w-12 h-12 absolute' />
        </TouchableOpacity>}
    </Animatable.View>
  );
};

const Trending = ({ posts }: any) => {
  const [activeItem, setActiveItem] = useState(posts[0]);
  const viewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList data={posts} keyExtractor={(item) => item.$id} renderItem={({ item }: any) => (
      <TrendingItem activeItem={activeItem} item={item} />
    )} horizontal onViewableItemsChanged={viewableItemsChanged} viewabilityConfig={{
      itemVisiblePercentThreshold: 70
    }} contentOffset={{ x: 170, y: 0 }} />
  );
};

export default Trending;