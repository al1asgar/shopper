import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {OrderAction} from '../../persistence/order/OrderAction';
import {CartAction} from '../../persistence/cart/CartAction';
import PayPal from '../../component/icon/PayPal';
import CreditCard from '../../component/icon/CreditCard';
import CashOnDelivery from '../../component/icon/CashOnDelivery';
import CommonText from '../../component/common/CommonText';
import Select from '../../component/icon/Select';
import Back from '../../component/icon/Back';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';
import CommonLine from '../../component/common/CommonLine';
import CommonButton from '../../component/common/CommonButton';
import Bell from '../../component/icon/Bell';
//import {requestBillingAgreement, requestOneTimePayment} from 'react-native-paypal';


export default function PaymentScreen({route, navigation}) {
    const lang = useSelector(state => state.LanguageReducer.language);
    const {selectedAddress, shippingLine} = route.params;
    const paymentGateways = [
        {
            id: 1,
            name: lang.oneTimePayment,
        },
        {
            id: 2,
            name: lang.billingAgreement,
        },
        {
            id: 3,
            name: lang.creditCard,
        },
        {
            id: 4,
            name: lang.cashOnDelivery,
        },
    ];
    const [paymentMethod, setPaymentMethod] = useState(1);
    const cartData = useSelector(state => state.CartReducer);
    const cart = cartData.data;
    const dispatch = useDispatch();
    const lineItems = _.map(cart.cart, function (o) {
        return {
            product_id: o.product_id,
            variation_id: o.variation_id,
            quantity: o.quantity,
        };
    });
    useEffect(() => {

    }, []);
    const order = {
        'payment_method': 'paypal',
        'payment_method_title': 'Paypal',
        'set_paid': true,
        'billing': {
            'first_name': selectedAddress.physicalAddress.firstName,
            'last_name': selectedAddress.physicalAddress.lastName,
            'address_1': selectedAddress.physicalAddress.address_1,
            'address_2': selectedAddress.physicalAddress.address_2,
            'city': selectedAddress.physicalAddress.city,
            'state': selectedAddress.physicalAddress.state,
            'postcode': selectedAddress.physicalAddress.postal_code,
            'country': selectedAddress.physicalAddress.country,
            'email': selectedAddress.physicalAddress.email,
            'phone': selectedAddress.physicalAddress.phoneNumber,
        },
        'shipping': {
            'first_name': selectedAddress.physicalAddress.firstName,
            'last_name': selectedAddress.physicalAddress.lastName,
            'address_1': selectedAddress.physicalAddress.address_1,
            'address_2': selectedAddress.physicalAddress.address_2,
            'city': selectedAddress.physicalAddress.city,
            'state': selectedAddress.physicalAddress.state,
            'postcode': selectedAddress.physicalAddress.postal_code,
            'country': selectedAddress.physicalAddress.country,
            'email': selectedAddress.physicalAddress.email,
            'phone': selectedAddress.physicalAddress.phoneNumber,
        },
        'line_items': lineItems,
        'shipping_lines': [
            shippingLine,
        ],
    };
    const goToOrderComplete = (success) => {
        navigation.navigate('OrderCompleteScreen', {success});
    };
    const oneTimePayment = async () => {
        // await requestOneTimePayment(
        //     'sandbox_hc5dh2ym_rznzhfx49ztdzp8k',
        //     {
        //         amount: cart.paymentAmount.toString(), // required
        //         // any PayPal supported currency (see here: https://developer.paypal.com/docs/integration/direct/rest/currency-codes/#paypal-account-payments)
        //         currency: 'USD',
        //         // any PayPal supported locale (see here: https://braintree.github.io/braintree_ios/Classes/BTPayPalRequest.html#/c:objc(cs)BTPayPalRequest(py)localeCode)
        //         localeCode: 'en_US',
        //         shippingAddressRequired: false,
        //         userAction: 'commit', // display 'Pay Now' on the PayPal review page
        //         // one of 'authorize', 'sale', 'order'. defaults to 'authorize'. see details here: https://developer.paypal.com/docs/api/payments/v1/#payment-create-request-body
        //         intent: 'authorize',
        //     })
        //     .then((data) => {
        //         const oneTimeOrder = {
        //             ...order,
        //             'payment_method': 'paypal',
        //             'payment_method_title': 'Paypal',
        //             'set_paid': true
        //         };
        //         dispatch(OrderAction.createOrder('orders', oneTimeOrder)).then((data) => {
        //             if (data.success) {
        //                 dispatch(CartAction.resetCart({}));
        //                 goToOrderComplete(true);
        //             }
        //         });
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         goToOrderComplete(false);
        //     });
    };
    const requestBilling = () => {
        // requestBillingAgreement('sandbox_hc5dh2ym_rznzhfx49ztdzp8k', {
        //     billingAgreementDescription: 'Your agreement description', // required
        //     // any PayPal supported currency (see here: https://developer.paypal.com/docs/integration/direct/rest/currency-codes/#paypal-account-payments)
        //     currency: cart.paymentAmount,
        //     // any PayPal supported locale (see here: https://braintree.github.io/braintree_ios/Classes/BTPayPalRequest.html#/c:objc(cs)BTPayPalRequest(py)localeCode)
        //     localeCode: 'en_US',
        // })
        //     .then((data) => {
        //         const billingOrder = {
        //             ...order,
        //             'payment_method': 'paypal',
        //             'payment_method_title': 'Paypal',
        //             'set_paid': true
        //         };
        //         dispatch(OrderAction.createOrder('orders', billingOrder)).then((data) => {
        //             if (data.success) {
        //                 dispatch(CartAction.resetCart({}));
        //                 goToOrderComplete(true);
        //             }
        //         });
        //     })
        //     .catch((err) => {
        //         goToOrderComplete(false);
        //     });
    };
    const creditCardPayment = () => {
        const ccOrder = {
            ...order,
            'payment_method': 'cc',
            'payment_method_title': 'cc',
            'set_paid': true,
        };
        navigation.navigate('CardScreen', {order: ccOrder});
    };
    const cashOnDelivery = () => {
        const codOrder = {
            ...order,
            'payment_method': 'cod',
            'payment_method_title': lang.cashOnDelivery,
            'set_paid': true,
        };
        dispatch(OrderAction.createOrder('orders', codOrder)).then((data) => {
            if (data.success) {
                dispatch(CartAction.resetCart({}));
                goToOrderComplete(true);
            } else {
                goToOrderComplete(false);
            }
        });
    };
    const paymentItem = ({item}) => {
        const isSelected = item.id === paymentMethod;
        let defaultLogo = <PayPal/>;
        if (item.id === 3) {
            defaultLogo = <CreditCard/>;
        } else if (item.id === 4) {
            defaultLogo = <CashOnDelivery/>;
        }
        return (
            <View style={styles.addressItem}>
                <View style={styles.addressIcon}>
                    {defaultLogo}
                </View>
                <View style={styles.addressDetail}>
                    <CommonText>{item.name}</CommonText>
                </View>
                <TouchableOpacity activeOpacity={0.9} style={styles.addressSelect} onPress={() => {
                    setPaymentMethod(item.id);
                }}>
                    <Select isSelected={isSelected}/>
                </TouchableOpacity>
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
                    <CommonText style={{fontSize: 20}}>{lang.paymentMethod}</CommonText>
                    <TouchableOpacity style={styles.scanner}>
                        <Bell/>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <FlatGrid
                        style={{height: ResponsiveUtil.height(375)}}
                        itemDimension={ResponsiveUtil.height(375)}
                        data={paymentGateways}
                        renderItem={paymentItem}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
            <CommonLine/>
            <View style={styles.checkOutContainer}>
                <CommonButton label={lang.placeOrder} style={{elevation: 2}} onPress={async () => {
                    if (paymentMethod === 1) {
                        await oneTimePayment();
                    } else if (paymentMethod === 2) {
                        await requestBilling();
                    } else if (paymentMethod === 3) {
                        await creditCardPayment();
                    } else if (paymentMethod === 4) {
                        await cashOnDelivery();
                    }
                }}/>
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
    searchInput: {
        width: '100%',
        flex: 1,
        position: 'absolute',
        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15),
        zIndex: 99,
    },
    searchIcon: {
        position: 'absolute',
        top: ResponsiveUtil.height(15),
        right: ResponsiveUtil.width(20),
        backgroundColor: '#F3F6F8',
        width: ResponsiveUtil.width(28),
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressContainer: {
        width: '100%',
        height: ResponsiveUtil.height(430),
        marginTop: ResponsiveUtil.height(24),
    },
    myAddress: {
        width: '100%',
        height: ResponsiveUtil.height(374),
        marginTop: ResponsiveUtil.height(76),
    },
    addressItem: {
        width: '100%',
        height: ResponsiveUtil.height(65),
        flexDirection: 'row',
        borderBottomWidth: ResponsiveUtil.height(1),
        borderBottomColor: '#F3F6F8',
    },
    addressIcon: {
        width: ResponsiveUtil.width(40),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressSelect: {
        width: ResponsiveUtil.width(40),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressDetail: {
        flex: 1,
        justifyContent: 'center',

    },
    checkOutContainer: {
        width: '100%',
        height: ResponsiveUtil.height(54),
        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15),
        position: 'absolute',
        bottom: ResponsiveUtil.height2(0,20),
        backgroundColor: '#fff',
    },
    checkoutButton: {
        width: '100%',
        height: ResponsiveUtil.height(54),
        justifyContent: 'center',
        alignItems: 'center',
    },
});
