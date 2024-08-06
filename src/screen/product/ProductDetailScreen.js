import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {onScrollEvent, useValues} from 'react-native-redash';
// import {onScrollEvent, useValues} from 'react-native-redash/lib/module/v1';
import HeaderImage from './HeaderImage';
import Header from './Header';
import Content from './Content';
import _ from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {ProductAction} from '../../persistence/product/ProductAction';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';
import CommonButton from '../../component/common/CommonButton';
import {CartAction} from '../../persistence/cart/CartAction';
import CommonToast from '../../component/common/CommonToast';

export default function ProductDetailScreen({route, navigation}) {
  const {item} = route.params;
  const dispatch = useDispatch();
  const cart = useSelector(state => state.CartReducer.data);
  const lang = useSelector(state => state.LanguageReducer.language);
  const productVariants = useSelector(
    state => state.ProductReducer.data.productVariants,
  );
  const isVariantProduct = productVariants.length > 0;
  const [y] = useValues([0], []);
  const images1 = _.map(item.images, function (item, index) {
    item.uri = item.src;
    item.id = index.toString();
    return item;
  });
  const images = _.uniqBy(images1, function (e) {
    return e.uri;
  });
  const [visible, setIsVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const getProductVariant = (color, size) => {
    if (color != 'SKIP') {
      const variant = _.find(productVariants, function (o) {
        const attributes = o.attributes;
        const findColor = _.find(attributes, function (a) {
          return a.name === 'color' && a.option === color;
        });
        if (size != 'SKIP') {
          if (undefined !== findColor) {
            const findSize = _.find(attributes, function (z) {
              return z.name === 'size' && z.option === size;
            });
            if (undefined !== findSize) {
              return o;
            }
          }
        }
        if (undefined !== findColor) {
          return o;
        }
      });
      return variant;
    } else if (size != 'SKIP') {
      const variant = _.find(productVariants, function (o) {
        const attributes = o.attributes;
        const findSize = _.find(attributes, function (z) {
          return z.name === 'size' && z.option === size;
        });
        if (undefined !== findSize) {
          return o;
        }
      });
      return variant;
    }
  };

  useEffect(() => {
    const url = 'products/{0}/variations';
    dispatch(
      ProductAction.getProductVariants(url.replace('{0}', item.id), {
        params: '',
      }),
    );
  }, []);
  return (
    <View style={styles.container}>
      <HeaderImage {...{y}} setIsVisible={setIsVisible} images={images} />
      <Header {...{y}} item={item} itemCount={cart.itemCount} />
      <Animated.ScrollView
        style={[StyleSheet.absoluteFill, {height: ResponsiveUtil.height(730)}]}
        scrollEventThrottle={1}
        onScroll={onScrollEvent({y})}
        overScrollMode={'auto'}
        showsVerticalScrollIndicator={false}>
        <Content
          item={item}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          isVariantProduct={isVariantProduct}
        />
      </Animated.ScrollView>
      <View style={styles.addToCard}>
        <CommonButton
          label={lang.addToCart}
          style={{elevation: 2}}
          onPress={async () => {
            if (isVariantProduct) {
              if (selectedSize !== 'SKIP' && selectedSize === '') {
                CommonToast.error({
                  message: lang.pleaseChooseSize,
                });
              } else if (selectedColor !== 'SKIP' && selectedColor === '') {
                CommonToast.error({
                  message: lang.pleaseChooseColor,
                });
              } else {
                const variant = getProductVariant(selectedColor, selectedSize);
                const cartItem = {
                  ...variant,
                  name: item.name,
                  product_id: item.id,
                  variation_id: variant.id,
                  quantity: 1,
                  amount: parseInt(variant.price),
                  selectedColor,
                  selectedSize,
                  isVariantProduct,
                };
                dispatch(CartAction.addItem(cartItem));
              }
            } else {
              const cartItem = {
                ...item,
                product_id: item.id,
                quantity: 1,
                image: {src: item.images[1].src},
                amount: parseInt(item.price),
                selectedColor,
                selectedSize,
                isVariantProduct,
              };
              dispatch(CartAction.addItem(cartItem));
            }
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  addToCard: {
    width: '100%',
    height: ResponsiveUtil.height(54),
    paddingLeft: ResponsiveUtil.width(15),
    paddingRight: ResponsiveUtil.width(15),
    position: 'absolute',
    bottom: ResponsiveUtil.height2(0, 20),
    backgroundColor: '#fff',
  },
});
