import React from 'react';
import Animated, {Extrapolate, interpolate} from 'react-native-reanimated';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';
import {Constant} from './Constant';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
export default ({y, setIsVisible, images}) => {
  const height = interpolate(y, {
    inputRange: [-100, 0],
    outputRange: [
      Constant.HEADER_IMAGE_HEIGHT + 100,
      Constant.HEADER_IMAGE_HEIGHT,
    ],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const top = interpolate(y, {
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolateLeft: Extrapolate.CLAMP,
  });
  let image = {
    uri: images[0].src,
  };
  return (
    <AnimatedTouchableOpacity
      activeOpacity={0.9}
      style={[styles.container, {height, top}]}
      onPress={() => {
        setIsVisible(true);
      }}>
      <Image source={image} style={[styles.image]} resizeMode={'stretch'} />
    </AnimatedTouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: ResponsiveUtil.screenWidth(),
    height: Constant.HEADER_IMAGE_HEIGHT,
    zIndex: 999,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
