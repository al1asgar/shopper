import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CardView} from 'react-native-credit-card-input';
import {useFocusEffect} from '@react-navigation/native';
import stripe from '@agaweb/react-native-stripe';
import {CardAction} from "../../persistence/card/CardAction";
import {ColorUtil} from "../../util/ColorUtil";
import Edit from "../../component/icon/Edit";
import Remove from "../../component/icon/Remove";
import Back from "../../component/icon/Back";
import CommonText from "../../component/common/CommonText";
import Add from "../../component/icon/Add";
import CommonButton from "../../component/common/CommonButton";
import {ApplicationProperties} from "../../application.properties";
import {OrderAction} from "../../persistence/order/OrderAction";
import {CartAction} from "../../persistence/cart/CartAction";
import {ResponsiveUtil} from "../../util/ResponsiveUtil";
import CommonLoading from '../../component/common/CommonLoading';

export default function CardScreen({route, navigation}) {
    const lang = useSelector(state => state.LanguageReducer.language);
    const dispatch = useDispatch();
    const order = route.params.order;
    const [selectedCard, setSelectedCard] = useState({});
    const cards = useSelector(state => state.CardReducer.data.cards);
    const cartData = useSelector(state => state.CartReducer.data);
    useFocusEffect(
        React.useCallback(() => {
            dispatch(CardAction.findAllItems({}));
        }, []),
    );
    const renderCard = ({item}) => {
        const isSelected = item.id === selectedCard.id;
        return (
            <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={() => {
                setSelectedCard(item);
            }}>
                <CardView
                    name={item.holderName}
                    number={item.cardNo}
                    expiry={item.expiryDate}
                    brand={item.type}
                    style={{
                        width: '100%',
                    }}
                />
                <View style={{
                    flex: 1,
                    height: '100%',
                    backgroundColor: isSelected === true ? '#cbcaca': '#efefef',
                    borderRadius: 10,
                }}>
                    <TouchableOpacity style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                        activeOpacity={0.1}
                        onPress={() => {
                            navigation.navigate('UpdateCardScreen', {
                                item: item,
                            });
                        }}
                    >
                        <Edit/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                        activeOpacity={0.1}
                        onPress={() => {
                            dispatch(CardAction.removeItem({id: item.id}));
                        }}
                    >
                        <Remove/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };
    const goToOrderComplete = (success) => {
        navigation.navigate('OrderCompleteScreen', {success});
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
                    <CommonText style={{fontSize : 20}}>{lang.chooseACard}</CommonText>
                    <TouchableOpacity style={styles.scanner} onPress={() => {
                        navigation.navigate('AddCardScreen');
                    }}>
                        <Add/>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <FlatList
                        data={cards}
                        renderItem={renderCard}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        style={{
                            width: '100%',
                        }}

                    />
                </View>
            </View>
            <View style={styles.checkOutContainer}>
                <CommonButton label={'Process'} style={{elevation: 2}} onPress={() => {
                    const paymentUrl = 'amount=' + cartData.paymentAmount + '&currency=usd' + '&payment_method_types[]=card';
                    if (selectedCard !== null) {
                        CommonLoading.show();
                        const expMonthYear = selectedCard.expiryDate.split('/');
                        const expMonth = expMonthYear[0];
                        const expYear = expMonthYear[1];
                        fetch(ApplicationProperties.stripPaymentUrl, {
                            body: paymentUrl,
                            headers: {
                                Authorization: 'Basic '+ApplicationProperties.stripeAuthorizationKey,
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            method: 'POST',
                        })
                            .then(response => response.json())
                            .then(data => {
                                const cardDetails = {
                                    number: selectedCard.cardNo,
                                    expMonth: parseFloat(expMonth),
                                    expYear: parseFloat(expYear),
                                    cvc: selectedCard.cvv,
                                };

                                stripe.confirmPaymentWithCard(data.client_secret, cardDetails)
                                    .then(() => {
                                        dispatch(OrderAction.createOrder('orders', order)).then((data) => {
                                            if (data.success) {
                                                dispatch(CartAction.resetCart({}));
                                                CommonLoading.hide();
                                                goToOrderComplete(true)
                                            }else{
                                                CommonLoading.hide();
                                                goToOrderComplete(false);
                                            }
                                        });
                                    })
                                    .catch(err => {
                                        CommonLoading.hide();
                                        goToOrderComplete(false);
                                        console.log(err);
                                    });
                            });
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
        alignItems: 'center',

        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15),
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: ResponsiveUtil.width(5),
        marginBottom: ResponsiveUtil.width(5),
    },
    checkOutContainer: {
        width: '100%',
        height: ResponsiveUtil.height(54),
        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15),
        backgroundColor: '#fff',
    },

});
