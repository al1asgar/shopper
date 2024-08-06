import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {FlatGrid} from 'react-native-super-grid';
import _ from 'lodash';
import CommonText from "../../component/common/CommonText";
import {ResponsiveUtil} from "../../util/ResponsiveUtil";
import CommonNumberFormat from "../../component/common/CommonNumberFormat";
import Back from "../../component/icon/Back";
import Bell from "../../component/icon/Bell";
import User from "../../component/icon/User";
import Address from "../../component/icon/Address";
import CommonButton from "../../component/common/CommonButton";
import CommonShippingOption from "../../component/common/CommonShippingOption";
import {ColorUtil} from "../../util/ColorUtil";
import CommonLine from "../../component/common/CommonLine";

export default function OrderReviewScreen({route, navigation}) {
    const {selectedAddress} = route.params;
    const lang = useSelector(state => state.LanguageReducer.language);
    const cartData = useSelector(state => state.CartReducer.data);
    const cart = cartData.cart;
    const colorAttributes = useSelector(state => state.CommonReducer.data.colors);
    const [shippingLine, setShippingLine] = useState({});
    useEffect(() => {

    }, []);
    const cartItem = ({item}) => {
        let image = {
            uri: item.image.src,
        };
        return (
            <View style={styles.item}>
                <Image style={styles.itemImage} source={image} resizeMode={'cover'}/>
                <View style={styles.itemInformation}>
                    <View style={{flex: 5}}>
                        <CommonText numberOfLines={1} style={{fontSize: ResponsiveUtil.font(18)}}>{item.name}</CommonText>
                        <View style={styles.itemPrice}>
                            <CommonText>{item.quantity} x </CommonText>
                            <CommonNumberFormat value={item.price} style={[{}]}/>
                            <CommonText> = </CommonText>
                            <CommonNumberFormat value={item.amount} style={[{}]}/>

                        </View>
                    </View>
                    {
                        item.isVariantProduct &&
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
                            <View style={styles.itemColorAndSize}>
                                {
                                    item.selectedColor !== 'SKIP' &&
                                    <View style={[styles.color, {
                                        backgroundColor: _.find(colorAttributes, function (color) {
                                            return color.name === item.selectedColor;
                                        }).description,
                                    }]}></View>
                                }
                                {
                                    item.selectedSize !== 'SKIP' &&
                                    <View style={styles.size}><CommonText>{item.selectedSize}</CommonText></View>
                                }
                            </View>
                        </View>
                    }
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
                    <CommonText style={{fontSize : 20}}>{lang.orderReview}</CommonText>
                    <TouchableOpacity style={styles.scanner}>
                        <Bell/>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <View style={styles.itemList}>
                        <FlatGrid
                            itemDimension={ResponsiveUtil.height(345)}
                            data={cart}
                            renderItem={cartItem}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    <CommonLine/>
                    <View style={styles.shippingContainer}>
                        <CommonText>{lang.shippingTo}</CommonText>
                        <View style={styles.shippingAddress}>
                            <View style={styles.addressIcon}>
                                <User/>
                            </View>
                            <View style={styles.addressText}>
                                <CommonText numberOfLines={2}>{selectedAddress.physicalAddress.firstName} {selectedAddress.physicalAddress.lastName} {selectedAddress.physicalAddress.phoneNumber}</CommonText>
                            </View>
                            <View style={styles.addressButton}>
                            </View>
                        </View>
                        <View style={styles.shippingAddress}>
                            <View style={styles.addressIcon}>
                                <Address/>
                            </View>
                            <View style={styles.addressText}>
                                <CommonText numberOfLines={2}>{selectedAddress.geoAddress.formatted_address}</CommonText>
                            </View>
                            <View style={styles.addressButton}>
                                <CommonButton label={lang.change} onPress={() => {
                                    navigation.navigate('Shipping');
                                }} labelStyle={{
                                    marginTop: 0,
                                    fontSize: ResponsiveUtil.font(10),
                                }} style={{
                                    height: ResponsiveUtil.height(24),
                                    width: ResponsiveUtil.width(64),
                                    borderRadius: ResponsiveUtil.width(5),
                                }}/>
                            </View>
                        </View>
                        <CommonShippingOption onChange={(value) => {
                            setShippingLine(value)
                        }}/>
                    </View>
                </View>
            </View>
            <View style={styles.checkOutContainer}>
                <View style={styles.checkoutTotal}>
                    <CommonText>{lang.total}: </CommonText>
                    <CommonNumberFormat value={cartData.paymentAmount} style={[{
                        fontSize: ResponsiveUtil.font(16),
                        fontWeight: '700'
                    }]}/>
                </View>
                <View style={styles.checkoutButton}>
                    <CommonButton label={lang.continueToPayment} style={{elevation: 2}} disabled={cart.length == 0} onPress={() => {
                        navigation.navigate('PaymentScreen', {
                            selectedAddress,
                            shippingLine
                        });
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
    content : {
       flex : 1
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
        height: ResponsiveUtil.height(100),
        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15),
        position: 'absolute',
        bottom: ResponsiveUtil.height2(0,20),
        backgroundColor: '#fff',
    },
    checkoutTotal: {
        width: '100%',
        height: ResponsiveUtil.height(30),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    checkoutButton: {
        width: '100%',
        height: ResponsiveUtil.height(54),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: ResponsiveUtil.height(12),
    },
    item: {
        width: '100%',
        minHeight: ResponsiveUtil.width(70),
        marginBottom: ResponsiveUtil.height(5),
        backgroundColor: '#F3F6F8',
        borderRadius: ResponsiveUtil.width(15),
        paddingLeft: ResponsiveUtil.width(15),
        paddingTop: ResponsiveUtil.width(15),
        paddingBottom: ResponsiveUtil.width(15),
        flexDirection: 'row',
    },
    itemImage: {
        width: ResponsiveUtil.width(50),
        height: ResponsiveUtil.height(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemInformation: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15),
    },
    itemColorAndSize: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    itemColorContainer: {
        width: '100%',
        height: ResponsiveUtil.height(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    color: {
        width: ResponsiveUtil.width(24),
        height: ResponsiveUtil.height(24),
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    removeItem: {
        position: 'absolute',
        top: ResponsiveUtil.width(10),
        right: ResponsiveUtil.width(10),
    },
    itemList: {
        maxHeight: ResponsiveUtil.height(305),
        marginBottom: ResponsiveUtil.height(16),
        paddingLeft: ResponsiveUtil.width(6),
        paddingRight: ResponsiveUtil.width(6),
    },
    shippingContainer: {
        width: '100%',
        marginTop: ResponsiveUtil.height(16),
        height: ResponsiveUtil.height(210),
        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15)
    },
    shippingAddress: {
        width: '100%',
        flexDirection: 'row',
        marginTop: ResponsiveUtil.height(16),
        height: ResponsiveUtil.height(24),
        marginBottom: ResponsiveUtil.height(16),
    },
    shippingFee: {
        width: '100%',
        flexDirection: 'row',
        marginTop: ResponsiveUtil.height(16),
        height: ResponsiveUtil.height(24),
        marginBottom: ResponsiveUtil.height(16),
    },
    addressIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressText: {
        flex: 5,
    },
    addressButton: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    shippingOption: {
        flexDirection: 'row',
        borderRadius: ResponsiveUtil.width(30),
        marginTop: ResponsiveUtil.height(24),
        width: '100%',
        height: ResponsiveUtil.height(78),
        borderWidth: ResponsiveUtil.height(3),
        borderColor: ColorUtil.black,
    },
    shippingOptionLogoLeft: {
        width: ResponsiveUtil.width(72),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shippingOptionLogoRight: {
        width: ResponsiveUtil.width(72),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shippingOptionInfo: {
        flex: 1,
        justifyContent: 'center',
    },

});
