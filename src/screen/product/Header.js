import React from 'react';
import Animated, {Extrapolate, interpolate} from 'react-native-reanimated';
import {Constant} from './Constant';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';
import Back from '../../component/icon/Back';
import ShoppingBag from '../../component/icon/ShoppingBag';
import CommonText from '../../component/common/CommonText';
import {ColorUtil} from '../../util/ColorUtil';

export default ({y, item, itemCount}) => {
  const navigation = useNavigation();
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
    outputRange: [ResponsiveUtil.font(32), ResponsiveUtil.font(18)],
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
          <Back
            activeOpacity={activeOpacity}
            inActiveOpacity={inactiveOpacity}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.icon]}
          onPress={() => {
            navigation.navigate('CartScreen', {});
          }}>
          <ShoppingBag
            activeOpacity={activeOpacity}
            inActiveOpacity={inactiveOpacity}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: ResponsiveUtil.width(10),
              borderRadius: ResponsiveUtil.width(5),
              marginTop: ResponsiveUtil.height2(12, 3),
              width: ResponsiveUtil.width(15),
              height: ResponsiveUtil.height(15),
            }}>
            <CommonText
              style={{
                color: 'white',
                fontSize: ResponsiveUtil.font(10),
              }}>
              {itemCount}
            </CommonText>
          </View>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.title]}>
        <Animated.Text
          numberOfLines={1}
          style={[
            {
              color: 'black',
              fontSize: ResponsiveUtil.font(32),
              lineHeight: ResponsiveUtil.height(40),
              position: 'absolute',
              paddingLeft: ResponsiveUtil.width(15),
              paddingRight: ResponsiveUtil.width(15),
            },
            {fontSize, opacity: inactiveOpacity},
          ]}>
          {item.name}
        </Animated.Text>
      </Animated.View>
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: ResponsiveUtil.height2(0, ResponsiveUtil.statusBarHeight()),
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
    top: 0,
  },
  title: {
    position: 'absolute',
    top: ResponsiveUtil.height2(0, ResponsiveUtil.statusBarHeight()),
    left: ResponsiveUtil.width(35),
    width: Constant.WINDOW_WIDTH - ResponsiveUtil.width(70),
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
  },
});
