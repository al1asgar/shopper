import React from 'react';
import Animated, {Extrapolate, interpolate} from 'react-native-reanimated';
import {Constant} from './Constant';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ColorUtil} from '../../util/ColorUtil';
export default ({y, item}) => {
  const top = interpolate(y, {
    inputRange: [0, Constant.HEADER_IMAGE_HEIGHT],
    outputRange: [0, -Constant.HEADER_IMAGE_HEIGHT],
    extrapolateLeft: Extrapolate.CLAMP,
  });
  const randomIndex = Math.floor(Math.random() * 9) + 1;
  let img = require('../../../assets/quotes1.png');
  switch (randomIndex) {
    case 2:
      img = require('../../../assets/quotes2.png');
      break;
    case 3:
      img = require('../../../assets/quotes3.png');
      break;
    case 4:
      img = require('../../../assets/quotes4.png');
      break;
    case 5:
      img = require('../../../assets/quotes5.png');
      break;
    case 6:
      img = require('../../../assets/quotes6.png');
      break;
    case 7:
      img = require('../../../assets/quotes7.png');
      break;
    case 8:
      img = require('../../../assets/quotes8.png');
      break;
    case 9:
      img = require('../../../assets/quotes9.png');
      break;
    case 10:
      img = require('../../../assets/quotes10.png');
      break;
  }
  return (
    <Animated.View style={[styles.image, {top}]}>
      <FastImage
        style={styles.bg}
        source={img}
        resizeMode={FastImage.resizeMode.stretch}
      />
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Constant.WINDOW_WIDTH,
    backgroundColor: ColorUtil.lightpink,
    height: Constant.HEADER_IMAGE_HEIGHT,
  },
  bg: {
    width: '100%',
    height: '100%',
  },
});
