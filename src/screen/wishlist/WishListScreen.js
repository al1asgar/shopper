import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Animated, {diffClamp, interpolate, Value} from 'react-native-reanimated';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';
import Bell from '../../component/icon/Bell';
import CommonText from '../../component/common/CommonText';
import {ProductAction} from '../../persistence/product/ProductAction';
import _ from 'lodash';
import Back from '../../component/icon/Back';
import CommonNumberFormat from '../../component/common/CommonNumberFormat';
import CommonTouchableOpacity from '../../component/common/CommonTouchableOpacity';

export default function WishListScreen({route}) {
  const dispatch = useDispatch();
  const lang = useSelector(state => state.LanguageReducer.language);
  const HEADER_HEIGHT = ResponsiveUtil.statusBarHeight();
  const [transitionY] = useState(new Value(0));
  const headerDiffClamp = diffClamp(transitionY, 0, HEADER_HEIGHT);
  const interpolateY = interpolate(headerDiffClamp, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });
  const navigation = useNavigation();
  const user = useSelector(state => state.UserReducer.data.user);
  const wishlistProducts = useSelector(
    state => state.ProductReducer.data.wishlistProducts,
  );
  useEffect(() => {
    dispatch(
      ProductAction.getWishListProducts(
        'wishlist',
        user.loggedIn ? user.id : 'guest',
      ),
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
        <TouchableOpacity
          style={styles.scanner}
          onPress={() => {
            navigation.goBack();
          }}>
          <Back />
        </TouchableOpacity>
        <CommonText style={{fontSize: 20}}>{lang.wishlist}</CommonText>
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
          <View style={styles.productContainer}>
            {_.map(wishlistProducts, function (product, index) {
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
                    resizeMode={'stretch'}
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
    paddingTop: ResponsiveUtil.statusBarHeight(),
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
  productContainer: {
    width: '100%',
    marginTop: ResponsiveUtil.height(20),
    flexDirection: 'row',
    flexWrap: 'wrap',
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
