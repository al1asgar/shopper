import React from 'react';
import Animated, {Extrapolate, interpolate} from 'react-native-reanimated';
import {Constant} from './Constant';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';
import Back from '../../component/icon/Back';
import {AnimatedFastImage} from '../../component/common/CommonAnimated';
import _ from 'lodash';
export default ({y, item}) => {
  const firebaseUser = useSelector(
    state => state.UserReducer.data.firebaseUser,
  );

  let profileImg = require('../../../assets/avatar1.png');
  if (!_.isEmpty(firebaseUser) && firebaseUser.user.photoURL) {
    profileImg = {
      uri: firebaseUser.user.photoURL,
    };
  }
  const navigation = useNavigation();
  const top = interpolate(y, {
    inputRange: [0, Constant.HEADER_IMAGE_HEIGHT],
    outputRange: [
      ResponsiveUtil.height2(118, ResponsiveUtil.statusBarHeight()),
      ResponsiveUtil.height2(0, 40),
    ],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const topAvatar = interpolate(y, {
    inputRange: [0, Constant.HEADER_IMAGE_HEIGHT],
    outputRange: [ResponsiveUtil.height(200), ResponsiveUtil.height2(-33, 70)],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const scaleAvatar = interpolate(y, {
    inputRange: [0, Constant.HEADER_IMAGE_HEIGHT],
    outputRange: [1, 0.5],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const transformXAvatar = interpolate(y, {
    inputRange: [0, Constant.HEADER_IMAGE_HEIGHT],
    outputRange: [0, Constant.WINDOW_WIDTH - 60],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const opacity = interpolate(y, {
    inputRange: [
      0,
      Constant.HEADER_IMAGE_HEIGHT -
        ResponsiveUtil.height(100) -
        ResponsiveUtil.statusBarHeight(),
      Constant.HEADER_IMAGE_HEIGHT,
    ],
    outputRange: [0, 0, 1],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const activeOpacity = interpolate(y, {
    inputRange: [0, Constant.HEADER_IMAGE_HEIGHT],
    outputRange: [1, 0],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const inactiveOpacity = interpolate(y, {
    inputRange: [0, Constant.HEADER_IMAGE_HEIGHT],
    outputRange: [0, 1],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const fontSize = interpolate(y, {
    inputRange: [0, Constant.HEADER_IMAGE_HEIGHT],
    outputRange: [ResponsiveUtil.font(24), ResponsiveUtil.font(18)],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const fontSize2 = interpolate(y, {
    inputRange: [0, Constant.HEADER_IMAGE_HEIGHT],
    outputRange: [ResponsiveUtil.font(10), ResponsiveUtil.font(9)],
    extrapolateRight: Extrapolate.CLAMP,
  });
  return (
    <>
      <Animated.View style={[styles.header]}>
        <Animated.View style={[styles.headerBg, {opacity}]}></Animated.View>
        <TouchableOpacity
          style={[styles.icon]}
          onPress={() => {
            navigation.goBack();
          }}>
          <Back />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.icon]}
          onPress={() => {}}></TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.title, {top}]}>
        <Animated.Text
          style={[
            {
              color: 'black',
              fontSize: ResponsiveUtil.font(32),
              lineHeight: ResponsiveUtil.height(40),
              position: 'absolute',
            },
            {fontSize, opacity: inactiveOpacity},
          ]}>
          {item.name}
        </Animated.Text>
      </Animated.View>
      <AnimatedFastImage
        source={profileImg}
        resizeMode={FastImage.resizeMode.contain}
        style={[
          styles.avatar,
          {
            transform: [
              {
                scale: scaleAvatar,
                translateX: transformXAvatar,
                translateY: topAvatar,
              },
            ],
          },
          {opacity: inactiveOpacity},
        ]}
      />
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Constant.WINDOW_WIDTH,
    height: ResponsiveUtil.height(100) - ResponsiveUtil.statusBarHeight(),
    zIndex: 999,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: ResponsiveUtil.width(15),
    paddingRight: ResponsiveUtil.width(15),
  },
  headerBg: {
    backgroundColor: '#fff',
    width: ResponsiveUtil.screenWidth(),
    height: '100%',
    position: 'absolute',
    top: ResponsiveUtil.height2(0, ResponsiveUtil.statusBarHeight()),
  },
  title: {
    position: 'absolute',
    top: 100,
    left: ResponsiveUtil.width(50),
    width: Constant.WINDOW_WIDTH - ResponsiveUtil.width(95),
    height: ResponsiveUtil.height(100) - ResponsiveUtil.statusBarHeight(),
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    height: '100%',
    width: ResponsiveUtil.width(20),
    top: ResponsiveUtil.height2(0, 45),
  },
  avatar: {
    height: ResponsiveUtil.width(70),
    width: ResponsiveUtil.width(70),
    position: 'absolute',
    zIndex: 1000,
    left: Constant.WINDOW_WIDTH / 2 - ResponsiveUtil.width(40),
    borderRadius: 1000,
  },
});
