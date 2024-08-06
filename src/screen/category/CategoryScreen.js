import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Animated, {diffClamp, interpolate, Value} from 'react-native-reanimated';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';
import Menu from '../../component/icon/Menu';
import Bell from '../../component/icon/Bell';
import CommonText from '../../component/common/CommonText';
import Swiper from 'react-native-swiper';
import _ from 'lodash';
import FastImage from 'react-native-fast-image';
import CommonTouchableOpacity from '../../component/common/CommonTouchableOpacity';

export default function CategoryScreen({navigation, route}) {
  const lang = useSelector(state => state.LanguageReducer.language);
  const HEADER_HEIGHT = ResponsiveUtil.statusBarHeight();
  const [transitionY] = useState(new Value(0));
  const headerDiffClamp = diffClamp(transitionY, 0, HEADER_HEIGHT);
  const interpolateY = interpolate(headerDiffClamp, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [ResponsiveUtil.height2(0, HEADER_HEIGHT), -HEADER_HEIGHT],
  });
  const categories = useSelector(
    state => state.CategoryReducer.data.categories,
  );
  const pCategories = _.filter(categories, function (cate) {
    return cate.parent == 16;
  });
  const bannerCategories = _.filter(categories, function (category) {
    return category.parent == 20;
  });
  useEffect(() => {}, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.topBar,
          {
            transform: [{translateY: interpolateY}],
          },
        ]}>
        <TouchableOpacity
          style={styles.scanner}
          onPress={() => {
            navigation.toggleDrawer();
          }}>
          <Menu />
        </TouchableOpacity>
        <CommonText style={{fontSize: 20}}>{lang.categories}</CommonText>
        <TouchableOpacity style={styles.scanner}>
          <Bell />
        </TouchableOpacity>
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: transitionY,
              },
            },
          },
        ])}
        scrollEventThrottle={16}
        style={StyleSheet.absoluteFill}>
        <View style={styles.body}>
          <View style={styles.swiper}>
            <Swiper showsButtons={false} autoplay={true}>
              {_.map(bannerCategories, function (cate) {
                return (
                  <CommonTouchableOpacity
                    style={styles.swiperItem}
                    key={cate.id.toString()}
                    onPress={() => {
                      navigation.navigate('SubCategoryScreen', {
                        category: cate,
                      });
                    }}>
                    <FastImage
                      style={[styles.swiperItem]}
                      source={{uri: cate.image.src}}
                      resizeMode={'cover'}
                    />
                  </CommonTouchableOpacity>
                );
              })}
            </Swiper>
          </View>
          {_.map(pCategories, function (cate) {
            return (
              <CommonTouchableOpacity
                style={styles.advertising}
                key={cate.id.toString()}
                onPress={() => {
                  navigation.navigate('SubCategoryScreen', {category: cate});
                }}>
                <ImageBackground
                  style={[
                    styles.advertisingImage,
                    {justifyContent: 'flex-end'},
                  ]}
                  source={{uri: cate.image.src}}
                  resizeMode={'stretch'}>
                  <View style={styles.advertisingTitle}>
                    <CommonText
                      style={{
                        fontSize: 18,
                        color: 'white',
                      }}>
                      {cate.name}
                    </CommonText>
                  </View>
                </ImageBackground>
              </CommonTouchableOpacity>
            );
          })}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    paddingTop:
      ResponsiveUtil.statusBarHeight() - ResponsiveUtil.height2(0, -40),
    paddingLeft: ResponsiveUtil.width(15),
    paddingRight: ResponsiveUtil.width(15),
  },
  topBar: {
    height: ResponsiveUtil.statusBarHeight(),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: ResponsiveUtil.width(15),
    paddingRight: ResponsiveUtil.width(15),
    position: 'absolute',
    backgroundColor: '#fff',
    zIndex: 9999,
  },
  category: {
    marginTop: ResponsiveUtil.height(20),
    marginBottom: ResponsiveUtil.height(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  group: {
    width: ResponsiveUtil.width(102),
    height: ResponsiveUtil.width(102),
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#EBEBEB',
  },
  groupImage: {
    width: ResponsiveUtil.width(102),
    height: ResponsiveUtil.width(72),
  },
  groupTitle: {
    width: ResponsiveUtil.width(102),
    height: ResponsiveUtil.width(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiper: {
    width: '100%',
    height: ResponsiveUtil.width(118),
  },
  swiperItem: {
    width: '100%',
    height: '100%',
  },
  advertising: {
    width: '100%',
    height: ResponsiveUtil.width(300),
    marginTop: ResponsiveUtil.height(20),
  },
  advertisingImage: {
    width: '100%',
    height: '100%',
  },
  advertisingTitle: {
    width: '100%',
    height: ResponsiveUtil.height(50),
    backgroundColor: 'rgba(33,33,33,0.5)',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
