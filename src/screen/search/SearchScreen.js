import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import _ from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import MyAsyncStorage from '../../persistence/storage/MyAsyncStorage';
import Animated, {diffClamp, interpolate, Value} from 'react-native-reanimated';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';
import {ProductAction} from '../../persistence/product/ProductAction';
import CommonSearchInput from '../../component/common/CommonSearchInput';
import Search from '../../component/icon/Search';
import Clear from '../../component/icon/Clear';
import CommonText from '../../component/common/CommonText';
import Time from '../../component/icon/Time';
import CommonNumberFormat from '../../component/common/CommonNumberFormat';
import CommonLoading from '../../component/common/CommonLoading';

export default function SearchScreen({navigation}) {
  const lang = useSelector(state => state.LanguageReducer.language);
  const HEADER_HEIGHT =
    ResponsiveUtil.height(100) - ResponsiveUtil.statusBarHeight();
  const [transitionY] = useState(new Value(0));
  const headerDiffClamp = diffClamp(transitionY, 0, HEADER_HEIGHT);
  const interpolateY = interpolate(headerDiffClamp, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [ResponsiveUtil.height2(0, HEADER_HEIGHT), -HEADER_HEIGHT],
  });
  const dispatch = useDispatch();
  const relevantProducts = useSelector(
    state => state.ProductReducer.data.relevantProducts,
  );
  const [recentSearchFlag, setRecentSearchFlag] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [recentKeywords, setRecentKeywords] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [stop, setStop] = useState(false);
  useEffect(() => {
    async function getRecentKeywords() {
      const keywords = await MyAsyncStorage.getData('recentKeywords');
      setRecentKeywords(keywords === null ? [] : keywords);
    }
    getRecentKeywords();
    dispatch(
      ProductAction.getAllRelevantProducts('products', {page: 1, search: ''}),
    );
  }, []);
  const onSearch = async key => {
    if (key.length > 0) {
      let temp = [...recentKeywords];
      temp.push(key);
      if (temp.length > 3) {
        temp = _.drop(temp, 1);
      }
      setRecentKeywords(temp);
      await MyAsyncStorage.storeData('recentKeywords', temp);
    }
    dispatch(ProductAction.resetAllRelevantProducts()).then(() => {
      console.log();
      dispatch(
        ProductAction.getAllRelevantProducts('products', {
          page: 1,
          search: key,
        }),
      );
    });
  };
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
        <CommonSearchInput
          leftIcon={<Search />}
          rightIcon={<Clear />}
          placeholder={lang.searchOnMyStore}
          onFocus={() => {
            setRecentSearchFlag(false);
          }}
          onBlur={async () => {
            if (keyword.length == 0) {
              setRecentSearchFlag(true);
            }
            await onSearch(keyword);
          }}
          onRightIconClick={async () => {
            setKeyword('');
            await onSearch('');
            setRecentSearchFlag(true);
          }}
          onChangeText={value => {
            setKeyword(value);
          }}
          value={keyword}
        />
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
            CommonLoading.show();
            setLoading(true);
            let currentPage = page;
            currentPage++;
            setPage(currentPage);
            dispatch(
              ProductAction.getAllRelevantProducts('products', {
                page: currentPage,
                search: keyword,
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
          {recentSearchFlag && recentKeywords && recentKeywords.length > 0 && (
            <View style={styles.recentSearch}>
              <View style={styles.recentSearchTitle}>
                <CommonText
                  style={[
                    {
                      fontWeight: '700',
                      letterSpacing: ResponsiveUtil.width(1),
                      color: 'rgba(23,23,23,0.4)',
                    },
                  ]}>
                  {lang.recentSearches.toUpperCase()}
                </CommonText>
              </View>
              {_.map(recentKeywords, (value, index) => {
                return (
                  <View style={styles.recentSearchItem} key={index.toString()}>
                    <View style={styles.recentSearchItemLeftIcon}>
                      <Time />
                    </View>
                    <TouchableOpacity
                      style={styles.recentSearchItemTitle}
                      onPress={async () => {
                        setKeyword(value);
                        setRecentSearchFlag(false);
                        await onSearch(value);
                      }}>
                      <CommonText>{value}</CommonText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.recentSearchItemRightIcon}
                      onPress={async () => {
                        let temp = [...recentKeywords];
                        temp = _.filter(temp, function (o) {
                          return o != value;
                        });
                        setRecentKeywords(temp);
                        await MyAsyncStorage.storeData('recentKeywords', temp);
                      }}>
                      <Clear />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
          <View
            style={{
              paddingLeft: ResponsiveUtil.width(15),
              paddingRight: ResponsiveUtil.width(15),
            }}>
            <View style={styles.recentSearchTitle}>
              <CommonText
                style={[
                  {
                    fontWeight: '700',
                    letterSpacing: ResponsiveUtil.width(1),
                    color: 'rgba(23,23,23,0.4)',
                  },
                ]}>
                {lang.found.toUpperCase()} {relevantProducts.length}{' '}
                {lang.result.toUpperCase()}
              </CommonText>
            </View>
            <View style={styles.productContainer}>
              {_.map(relevantProducts, function (product, index) {
                return (
                  <TouchableOpacity
                    style={[
                      styles.productItem,
                      index % 2 === 0 ? {marginRight: 16} : {},
                    ]}
                    key={product.id.toString()}
                    onPress={() => {
                      navigation.navigate('ProductDetailScreen', {
                        item: product,
                      });
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
                  </TouchableOpacity>
                );
              })}
            </View>
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
  topBar: {
    height: ResponsiveUtil.statusBarHeight(),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: ResponsiveUtil.width(15),
    paddingRight: ResponsiveUtil.width(15),
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 9999,
    borderBottomWidth: ResponsiveUtil.width(1),
    borderBottomColor: '#F3F6F8',
  },
  body: {
    paddingTop:
      ResponsiveUtil.statusBarHeight() - ResponsiveUtil.height2(0, -70),
  },
  line: {
    backgroundColor: '#F3F6F8',
    width: '100%',
    height: ResponsiveUtil.height(1),
  },
  recentSearch: {
    width: '100%',
    marginTop: ResponsiveUtil.width(10),
    paddingLeft: ResponsiveUtil.width(15),
    paddingRight: ResponsiveUtil.width(15),
  },
  recentSearchTitle: {
    width: '100%',
    height: ResponsiveUtil.height(20),
    marginTop: ResponsiveUtil.height(15),
  },
  recentSearchItem: {
    width: '100%',
    height: ResponsiveUtil.height(41),
    flexDirection: 'row',
    marginTop: ResponsiveUtil.height(24),
    borderBottomWidth: ResponsiveUtil.height(0.2),
    borderBottomColor: '#8d8d8d',
  },
  recentSearchItemLeftIcon: {
    width: ResponsiveUtil.width(24),
    height: ResponsiveUtil.height(24),
  },
  recentSearchItemRightIcon: {
    width: ResponsiveUtil.width(24),
    height: ResponsiveUtil.height(24),
  },
  recentSearchItemTitle: {
    flex: 1,
    paddingLeft: ResponsiveUtil.width(10),
  },
  recommended: {
    flex: 1,
    marginTop: ResponsiveUtil.height(32),
    paddingLeft: ResponsiveUtil.width(15),
    paddingRight: ResponsiveUtil.width(15),
  },
  title: {
    height: ResponsiveUtil.height(20),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendedCard: {
    width: '100%',
    flexDirection: 'row',
    marginTop: ResponsiveUtil.height(24),
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
