import React, {useEffect} from 'react';
import {Image, SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {FlatGrid} from 'react-native-super-grid';
import _ from 'lodash';
import {CartAction} from '../../persistence/cart/CartAction';
import Clear from '../../component/icon/Clear';
import CommonText from '../../component/common/CommonText';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';
import CommonNumberFormat from '../../component/common/CommonNumberFormat';
import InputSpinner from 'react-native-input-spinner';
import {ColorUtil} from '../../util/ColorUtil';
import Back from '../../component/icon/Back';
import Bell from '../../component/icon/Bell';
import CommonLine from '../../component/common/CommonLine';
import CommonButton from '../../component/common/CommonButton';

export default function CartScreen({navigation}) {
    const lang = useSelector(state => state.LanguageReducer.language);
    const dispatch = useDispatch();
    const cartData = useSelector(state => state.CartReducer.data);
    const cart = cartData.cart;
    const colorAttributes = useSelector(state => state.CommonReducer.data.colors);
    const isLoggedIn = useSelector(state => state.UserReducer.data.loggedIn);
    useEffect(() => {

    }, []);
    const cartItem = ({item}) => {
        let image = {
            uri: item.image.src,
        };
        return (
            <View style={styles.item}>
                <TouchableOpacity style={styles.removeItem} onPress={() => {
                    dispatch(CartAction.removeItem({...item}));
                }}>
                    <Clear/>
                </TouchableOpacity>
                <Image style={styles.itemImage} source={image} resizeMode={'contain'}/>
                <View style={styles.itemInformation}>
                    <CommonText numberOfLines={1} style={{fontSize: ResponsiveUtil.font(20)}}>{item.name}</CommonText>
                    {
                        item.isVariantProduct &&
                        <View style={styles.itemColorAndSize}>
                            <CommonText style={{
                                fontSize: ResponsiveUtil.font(16),
                                lineHeight: ResponsiveUtil.width(16),
                                fontWeight: '400',
                                letterSpacing: ResponsiveUtil.width(-0.3),
                                color: 'rgba(23,23,23,0.4)',
                            }}>{lang.color}</CommonText>
                            <View style={[styles.color, {
                                backgroundColor: _.find(colorAttributes, function (color) {
                                    return color.name === item.selectedColor;
                                }).description,
                            }]}></View>
                            {
                                item.selectedSize != 'SKIP' && <CommonText>{lang.size}</CommonText> &&
                                <View style={styles.size}><CommonText>{item.selectedSize}</CommonText></View>
                            }

                        </View>
                    }
                    <View style={styles.itemPrice}>
                        <CommonNumberFormat value={item.amount} style={{
                            fontSize: ResponsiveUtil.font(12),
                            lineHeight: ResponsiveUtil.width(20),
                            fontWeight: '400',
                        }}/>
                    </View>
                    <InputSpinner
                        color={ColorUtil.black}
                        value={item.quantity}
                        max={30}
                        min={1}
                        step={1}
                        onChange={(num) => {
                            dispatch(CartAction.updateItem({...item, quantity: num}));
                        }}
                        rounded={false}
                        style={{
                            height: ResponsiveUtil.height(16),
                            width: ResponsiveUtil.width(88),
                        }}
                        inputStyle={{
                            height: ResponsiveUtil.height(40),
                            backgroundColor: '#ffffff',

                        }}
                        buttonStyle={{
                            height: ResponsiveUtil.height(32),
                            width: ResponsiveUtil.width(24),
                            color: '#000',
                            backgroundColor: '#F3F6F8',
                            borderWidth: 0,
                            marginBottom : ResponsiveUtil.height(23),
                        }}
                        buttonTextColor={'#8F92A1'}
                    />
                </View>
            </View>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.scanner} onPress={() => {
                        navigation.goBack();
                    }}>
                        <Back/>
                    </TouchableOpacity>
                    <CommonText style={{fontSize : 20}}>{lang.myCart}</CommonText>
                    <TouchableOpacity style={styles.scanner}>
                        <Bell/>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <FlatGrid
                        style={{height: ResponsiveUtil.height(278)}}
                        itemDimension={ResponsiveUtil.height(345)}
                        data={cart}
                        renderItem={cartItem}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
            <CommonLine/>
            <View style={styles.checkOutContainer}>
                <View style={styles.checkoutTotal}>
                    <CommonText>{lang.total}: </CommonText>
                    <CommonNumberFormat value={cartData.paymentAmount} style={[{
                        fontSize: ResponsiveUtil.font(16),
                        lineHeight: ResponsiveUtil.width(32),
                    }]}/>
                </View>
                <View style={styles.checkoutButton}>
                    <CommonButton label={lang.checkOut.toUpperCase()} style={{elevation: 2}} disabled={cart.length == 0} onPress={() => {
                        if (isLoggedIn) {
                            navigation.navigate('AddressScreen');
                        } else {
                            navigation.push('AuthenticationNavigator', {
                                screen: 'SignInScreen',
                            });
                        }
                    }}/>
                </View>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,

    },
    topBar: {
        height: ResponsiveUtil.statusBarHeight(),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15),
        backgroundColor: '#fff',
    },
    scanner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 1,
    },
    checkOutContainer: {
        width: '100%',
        height: ResponsiveUtil.height(146),
        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15),
    },
    checkoutTotal: {
        width: '100%',
        height: ResponsiveUtil.height(49),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    checkoutButton: {
        width: '100%',
        height: ResponsiveUtil.height(49),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: ResponsiveUtil.height(32),
    },
    item: {
        width: '100%',
        height: ResponsiveUtil.width(164),
        marginBottom: ResponsiveUtil.height(5),
        backgroundColor: '#F3F6F8',
        borderRadius: ResponsiveUtil.width(15),
        padding: ResponsiveUtil.width(15),
        flexDirection: 'row',
    },
    itemImage: {
        width: ResponsiveUtil.width(88),
        height: ResponsiveUtil.height(124),
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemInformation: {
        flex: 1,
        paddingLeft: ResponsiveUtil.width(16),
        paddingRight: ResponsiveUtil.width(16),
        justifyContent: 'space-between',
    },
    itemColorAndSize: {
        width: ResponsiveUtil.width(150),
        height: ResponsiveUtil.height(44),
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemColorContainer: {
        width: ResponsiveUtil.width(75),
        height: ResponsiveUtil.height(44),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    color: {
        width: ResponsiveUtil.width(24),
        height: ResponsiveUtil.height(24),
        marginLeft: ResponsiveUtil.width(5),
        marginRight: ResponsiveUtil.width(5),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: ResponsiveUtil.width(5),
    },
    size: {
        width: ResponsiveUtil.width(28),
        height: ResponsiveUtil.height(28),
        marginRight: ResponsiveUtil.width(5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: ResponsiveUtil.width(5),
    },
    itemPrice: {
        marginBottom: ResponsiveUtil.height(8),
    },
    removeItem: {
        position: 'absolute',
        top: ResponsiveUtil.width(10),
        right: ResponsiveUtil.width(10),
    },
});
