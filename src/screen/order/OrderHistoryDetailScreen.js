import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {FlatGrid} from 'react-native-super-grid';
import _ from 'lodash';
import QRCode from 'react-native-qrcode-svg';
import firestore from '@react-native-firebase/firestore';
import CommonText from '../../component/common/CommonText';
import CommonNumberFormat from '../../component/common/CommonNumberFormat';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';
import Back from '../../component/icon/Back';
import CircleCheck from '../../component/icon/CircleCheck';
import CommonLine from '../../component/common/CommonLine';
import Address from '../../component/icon/Address';
import {ColorUtil} from '../../util/ColorUtil';
import CommonButton from '../../component/common/CommonButton';

export default function OrderHistoryDetailScreen({route, navigation}) {
    const {item} = route.params;
    let processing = item.status === 'processing';
    let delivery = false;
    let completed = item.status === 'completed';
    if (completed) {
        processing = completed;
        delivery = completed;
    }
    const lang = useSelector(state => state.LanguageReducer.language);
    const colorAttributes = useSelector(state => state.CommonReducer.data.colors);
    const user = useSelector(state => state.UserReducer.data.user);
    const firebaseUser = useSelector(state => state.UserReducer.data.firebaseUser);
    const supporters = useSelector(state => state.CommonReducer.data.supporters);
    useEffect(() => {

    }, []);
    const cartItem = ({item}) => {
        return (
            <View style={styles.item}>
                <View style={styles.itemInformation}>
                    <View style={{flex: 5}}>
                        <CommonText numberOfLines={1} style={{fontSize: ResponsiveUtil.font(18)}}>{item.name}</CommonText>
                        <View style={styles.itemPrice}>
                            <CommonText>{item.quantity} x </CommonText>
                            <CommonNumberFormat value={item.price} style={[{}]}/>
                            <CommonText> = </CommonText>
                            <CommonNumberFormat value={item.total} style={[{}]}/>

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

    function onChatButtonPress(data) {
        const {roomName, uid} = data;
        if (roomName.length > 0) {
            const roles = {};
            roles[uid] = 'owner';
            const users = [...supporters,uid];
            const roomId = _.orderBy([uid, item.id]).join('_');
            const orderMessage = {
                text: lang.support,
                type: 'order',
                createdAt: new Date().getTime(),
                user: {
                    _id: uid,
                    email: user.email,
                    avatar: null,
                },
                order: item,
                sent: true,
                received: false,
            };
            const message = {
                text: lang.support,
                type: 'text',
                createdAt: new Date().getTime(),
                user: {
                    _id: uid,
                    email: user.email,
                    avatar: null,
                },
                sent: true,
                received: false,
            };
            firestore()
                .collection('THREADS')
                .doc(roomId)
                .set({
                    name: roomName,
                    latestMessage: {
                        text: `${lang.youHaveJoinedTheRoom}${roomName}.`,
                        createdAt: new Date().getTime(),
                    },
                    roles: roles,
                    users: users,
                    author: uid,
                    group: false,
                }, {merge: true})
                .then(async () => {
                    firestore()
                        .collection('THREADS')
                        .doc(roomId)
                        .collection('MESSAGES')
                        .add(orderMessage)
                        .then(() => {
                            firestore()
                                .collection('THREADS')
                                .doc(roomId)
                                .collection('MESSAGES')
                                .add(message)
                                .then(() => {
                                    let thread = {
                                        _id: roomId,
                                        text: `${lang.youHaveJoinedTheRoom}${roomName}.`,
                                        createdAt: new Date().getTime(),
                                        system: false,
                                    };
                                    navigation.navigate('ChatScreen', {thread: thread});
                                });
                        });

                }).catch(function (error) {
                console.error('Error adding document: ', error);
            });

        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1}}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.scanner} onPress={() => {
                        navigation.goBack();
                    }}>
                        <Back/>
                    </TouchableOpacity>
                    <CommonText style={{fontSize : 20}}>{lang.orderNo}{item.id}</CommonText>
                    <TouchableOpacity style={styles.scanner}>
                        <QRCode
                            value={item.number}
                            size={ResponsiveUtil.width(24)}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <View style={styles.shippingFlow}>
                        <CircleCheck complete={processing}/>
                        <CommonText style={styles.text}>{lang.processing}</CommonText>
                        <CommonLine style={styles.line}/>
                        <CircleCheck complete={delivery}/>
                        <CommonText style={styles.text}>{lang.delivering}</CommonText>
                        <CommonLine style={styles.line}/>
                        <CircleCheck complete={completed}/>
                        <CommonText style={styles.text}>{lang.completed}</CommonText>
                    </View>
                    <View style={styles.itemList}>
                        <FlatGrid
                            itemDimension={ResponsiveUtil.height(345)}
                            data={item.line_items}
                            renderItem={cartItem}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    <CommonLine/>
                    <View style={styles.shippingContainer}>
                        <CommonText>Shipping to</CommonText>
                        <View style={styles.shippingAddress}>
                            <View style={styles.addressIcon}>
                                <Address/>
                            </View>
                            <View style={styles.addressText}>
                                <CommonText style={{fontSize: ResponsiveUtil.font(14)}} numberOfLines={1}>{item.shipping.first_name} {item.shipping.last_name}</CommonText>
                                <CommonText style={{fontSize: ResponsiveUtil.font(12)}} numberOfLines={2}>{item.shipping.address_1}, {item.shipping.city}, {item.shipping.state}, {item.shipping.country}, {item.shipping.postcode}</CommonText>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.checkOutContainer}>
                <View style={styles.checkoutTotal}>
                    <CommonText>Total: </CommonText>
                    <CommonNumberFormat value={item.total} style={[{
                        fontSize: ResponsiveUtil.font(16),
                        fontWeight: '700',
                    }]}/>
                </View>
                <View style={styles.checkoutButton}>
                    <CommonButton label={lang.chatWithUs} style={{
                        elevation: 2,
                        backgroundColor: ColorUtil.black,
                    }} onPress={() => {
                        onChatButtonPress({
                            roomName: user.first_name + ' ' + user.last_name + ' #' + item.id,
                            email: user.email,
                            image: '',
                            uid: firebaseUser.user.uid,
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
        height: ResponsiveUtil.height(285),
        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15),
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
    shippingFlow: {
        height: ResponsiveUtil.width(70),
        width: '100%',
        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    line: {
        width: ResponsiveUtil.width(30),
    },
    text: {
        fontSize: ResponsiveUtil.width(12),
        fontWeight: '400',
    },
});
