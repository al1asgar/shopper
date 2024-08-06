import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Animated, {diffClamp, interpolate, Value} from 'react-native-reanimated';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';
import Menu from '../../component/icon/Menu';
import Bell from '../../component/icon/Bell';
import CommonText from '../../component/common/CommonText';
import Swiper from 'react-native-swiper';
import {CategoryAction} from '../../persistence/category/CategoryAction';
import _ from 'lodash';
import FastImage from 'react-native-fast-image';
import CommonTouchableOpacity from '../../component/common/CommonTouchableOpacity';

export default function MainScreen() {
  const dispatch = useDispatch();
  const lang = useSelector(state => state.LanguageReducer.language);
  const HEADER_HEIGHT = ResponsiveUtil.statusBarHeight();
  const [transitionY] = useState(new Value(0));
  const headerDiffClamp = diffClamp(transitionY, 0, HEADER_HEIGHT);
  const interpolateY = interpolate(headerDiffClamp, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [ResponsiveUtil.height2(0, HEADER_HEIGHT), -HEADER_HEIGHT],
  });
  const navigation = useNavigation();
  const categories = useSelector(
    state => state.CategoryReducer.data.categories,
  );
  const pCategories = _.filter(categories, function (category) {
    return category.parent == 16;
  });
  const bannerCategories = _.filter(categories, function (category) {
    return category.parent == 20;
  });
  const bodyCategories = _.filter(categories, function (category) {
    return category.parent == 23;
  });
  useEffect(() => {
    dispatch(
      CategoryAction.getAllCategories('products/categories', {
        exclude: [15],
        orderby: 'id',
        per_page: 50,
      }),
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.topBar,
          {
            transform: [{translateY: interpolateY}],
          },
        ]}>
        <CommonTouchableOpacity
          style={styles.scanner}
          onPress={() => {
            navigation.toggleDrawer();
          }}>
          <Menu />
        </CommonTouchableOpacity>
        <CommonText style={{fontSize: 20}}>ZARA</CommonText>
        <CommonTouchableOpacity style={styles.scanner}>
          <Bell />
        </CommonTouchableOpacity>
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
          <View style={styles.category}>
            {_.map(pCategories, function (cate) {
              return (
                <CommonTouchableOpacity
                  style={styles.group}
                  key={cate.id.toString()}
                  onPress={() => {
                    navigation.navigate('CategoryStackNavigator', {
                      screen: 'SubCategoryScreen',
                      params: {category: cate},
                    });
                  }}>
                  <View style={styles.groupImage}>
                    <FastImage
                      style={[
                        styles.groupImage,
                        {
                          borderTopLeftRadius: 5,
                          borderTopRightRadius: 5,
                        },
                      ]}
                      source={{uri: cate.image.src}}
                      resizeMode={'cover'}
                    />
                  </View>
                  <View style={styles.groupTitle}>
                    <CommonText>{cate.name}</CommonText>
                  </View>
                </CommonTouchableOpacity>
              );
            })}
          </View>
          <View style={styles.swiper}>
            <Swiper showsButtons={false} autoplay={true}>
              {_.map(bannerCategories, function (cate) {
                return (
                  <CommonTouchableOpacity
                    style={styles.swiperItem}
                    key={cate.id.toString()}
                    onPress={() => {
                      navigation.navigate('ProductByDiscountScreen', {
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
          {_.map(bodyCategories, function (cate) {
            return (
              <CommonTouchableOpacity
                style={styles.advertising}
                key={cate.id.toString()}
                onPress={() => {
                  navigation.navigate('ProductByDiscountScreen', {
                    category: cate,
                  });
                }}>
                <FastImage
                  style={[styles.advertisingImage]}
                  source={{uri: cate.image.src}}
                  resizeMode={'stretch'}
                />
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
    paddingLeft: ResponsiveUtil.width(15),
    paddingRight: ResponsiveUtil.width(15),
    paddingTop:
      ResponsiveUtil.statusBarHeight() - ResponsiveUtil.height2(-15, -30),
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
    height: ResponsiveUtil.width(181),
    marginTop: ResponsiveUtil.height(20),
  },
  advertisingImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    height: ResponsiveUtil.height(20),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ResponsiveUtil.height(12),
  },
  card: {
    width: '100%',
    height: ResponsiveUtil.height(248),
    flexDirection: 'row',
  },
  item: {
    width: ResponsiveUtil.width(205),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: ResponsiveUtil.width(16),
  },
  itemImage: {
    width: '100%',
    height: ResponsiveUtil.width(160),
  },
  itemTitle: {
    width: ResponsiveUtil.width(173),
    height: ResponsiveUtil.height(48),
    marginTop: ResponsiveUtil.height(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemBg: {
    width: ResponsiveUtil.width(205),
    height: ResponsiveUtil.height(200),
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  line: {
    backgroundColor: '#F3F6F8',
    width: '100%',
    height: ResponsiveUtil.height(1),
  },
  recommendedCard: {
    width: '100%',
    flexDirection: 'row',
    marginTop: ResponsiveUtil.height(32),
    flexWrap: 'wrap',
  },
  recommendedItem: {
    width: '49%',
    height: ResponsiveUtil.height(248),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F6F8',
    borderRadius: ResponsiveUtil.width(30),
    marginBottom: ResponsiveUtil.height(16),
  },
  marginRight: {
    marginRight: '1%',
  },
  marginLeft: {
    marginLeft: '1%',
  },
  recommendedItemImage: {
    width: '100%',
    height: ResponsiveUtil.width(160),
  },
  recommendedItemTitle: {
    width: ResponsiveUtil.width(130),
    height: ResponsiveUtil.height(48),
    marginTop: ResponsiveUtil.height(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendedItemBg: {
    width: ResponsiveUtil.width(164.5),
    height: ResponsiveUtil.height(200),
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
