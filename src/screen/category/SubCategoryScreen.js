import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Animated, {diffClamp, interpolate, Value} from 'react-native-reanimated';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';
import Bell from '../../component/icon/Bell';
import CommonText from '../../component/common/CommonText';
import Swiper from 'react-native-swiper';
import _ from 'lodash';
import Back from '../../component/icon/Back';
import CommonTouchableOpacity from '../../component/common/CommonTouchableOpacity';
import FastImage from 'react-native-fast-image';
import CommonNumberFormat from '../../component/common/CommonNumberFormat';
import {ProductAction} from '../../persistence/product/ProductAction';
import {useFocusEffect} from '@react-navigation/native';
import CommonLoading from '../../component/common/CommonLoading';

export default function SubCategoryScreen({navigation, route}) {
  const {category} = route.params;
  const HEADER_HEIGHT = ResponsiveUtil.statusBarHeight();
  const [transitionY] = useState(new Value(0));
  const headerDiffClamp = diffClamp(transitionY, 0, HEADER_HEIGHT);
  const interpolateY = interpolate(headerDiffClamp, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [ResponsiveUtil.height2(0, HEADER_HEIGHT), -HEADER_HEIGHT],
  });
  const dispatch = useDispatch();
  const categories = useSelector(
    state => state.CategoryReducer.data.categories,
  );
  const pCategories = _.filter(categories, function (cate) {
    return cate.parent == category.id;
  });
  const bannerCategories = _.filter(categories, function (category) {
    return category.parent == 20;
  });
  const productsByCategory = useSelector(
    state => state.ProductReducer.data.productsByCategory,
  );
  useFocusEffect(
    React.useCallback(() => {
      dispatch(ProductAction.resetAllProductsByCategory()).then(() => {
        dispatch(
          ProductAction.getAllProductsByCategory('products', {
            page: 1,
            category: category.id,
          }),
        );
      });
    }, []),
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [stop, setStop] = useState(false);
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 100;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
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
            navigation.navigate('CategoryScreen');
          }}>
          <Back />
        </CommonTouchableOpacity>
        <CommonText style={{fontSize: 20}}>{category.name}</CommonText>
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
        style={StyleSheet.absoluteFill}
        onMomentumScrollEnd={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent) && !loading && !stop) {
            setLoading(true);
            CommonLoading.show();
            let currentPage = page;
            currentPage++;
            setPage(currentPage);
            dispatch(
              ProductAction.getAllProductsByCategory('products', {
                page: currentPage,
                category: category.id,
              }),
            ).then(data => {
              setLoading(false);
              CommonLoading.hide();
              if (data.data.length === 0) {
                setStop(true);
              }
            });
          }
        }}>
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
                  navigation.navigate('ProductByCategoryScreen', {
                    category: cate,
                  });
                }}>
                <Image
                  style={[styles.advertisingImage]}
                  source={{uri: cate.image.src}}
                  resizeMode={'stretch'}
                />
              </CommonTouchableOpacity>
            );
          })}
          <View style={styles.productContainer}>
            {_.map(productsByCategory, function (product, index) {
              return (
                <CommonTouchableOpacity
                  style={[
                    styles.productItem,
                    index % 2 === 0 ? {marginRight: 16} : {},
                  ]}
                  key={product.id.toString()}
                  onPress={() => {
                    navigation.navigate('ProductDetailScreen', {item: product});
                  }}>
                  <Image
                    style={[styles.productImage]}
                    source={{uri: product.images[0].src}}
                    resizeMode={'cover'}
                  />
                  <View style={styles.productItemTitle}>
                    <CommonText numberOfLines={1} style={styles.productName}>
                      {product.name}
                    </CommonText>
                    <CommonNumberFormat value={product.price} />
                  </View>
                </CommonTouchableOpacity>
              );
            })}
          </View>
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
    height: ResponsiveUtil.width(118),
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
  productContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: ResponsiveUtil.height(15),
  },
  productItem: {
    width: ResponsiveUtil.width(165),
    height: ResponsiveUtil.width(232),
  },
  productImage: {
    width: ResponsiveUtil.width(165),
    height: ResponsiveUtil.width(165),
  },
  productName: {
    fontSize: ResponsiveUtil.font(14),
    lineHeight: ResponsiveUtil.height(20),
    fontWeight: '400',
  },
  productPrice: {
    fontSize: ResponsiveUtil.font(16),
    lineHeight: ResponsiveUtil.height(24),
    fontWeight: 'bold',
  },
  productItemTitle: {
    width: ResponsiveUtil.width(130),
    height: ResponsiveUtil.height(48),
    marginTop: ResponsiveUtil.height(16),
    justifyContent: 'center',
  },
});
