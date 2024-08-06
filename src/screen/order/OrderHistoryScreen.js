import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {FlatGrid} from 'react-native-super-grid';
import QRCode from 'react-native-qrcode-svg';
import {useDispatch, useSelector} from 'react-redux';
import {OrderAction} from '../../persistence/order/OrderAction';
import CommonText from '../../component/common/CommonText';
import User from '../../component/icon/User';
import PayPal from '../../component/icon/PayPal';
import CommonNumberFormat from '../../component/common/CommonNumberFormat';
import CommonButton from '../../component/common/CommonButton';
import Address from '../../component/icon/Address';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';
import Back from '../../component/icon/Back';
import Bell from '../../component/icon/Bell';
import {ColorUtil} from '../../util/ColorUtil';


export default function OrderHistoryScreen({ navigation}) {
    const dispatch = useDispatch();
    const lang = useSelector(state => state.LanguageReducer.language);
    const ongoingOrders = useSelector(state => state.OrderReducer.data.ongoingOrders);
    const completeOrders = useSelector(state => state.OrderReducer.data.completeOrders);
    const cancelledOrders = useSelector(state => state.OrderReducer.data.cancelledOrders);

    useEffect(() => {
        dispatch(OrderAction.getAllOnGoingOrders('orders', {status: ['processing', 'pending', 'on-hold']}));
        dispatch(OrderAction.getAllCompleteOrders('orders', {status: 'completed'}));
        dispatch(OrderAction.getAllCancelledOrders('orders', {status: ['cancelled', 'refunded', 'failed', 'trash']}));
    }, []);
    const categoryItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => {

            }} style={styles.item} activeOpacity={0.9}>
                <View style={styles.qrCode}>
                    <QRCode
                        value={item.number}
                        size={ResponsiveUtil.width(80)}
                    />
                    <CommonText>#{item.number}</CommonText>
                </View>
                <View style={styles.itemInformation}>
                    <View style={styles.itemLine}>
                        <View style={styles.itemLineIcon}>
                            <User/>
                        </View>
                        <View style={styles.itemLineText}>
                            <CommonText style={{fontSize: ResponsiveUtil.font(14)}} numberOfLines={1}>{item.shipping.first_name} {item.shipping.last_name}</CommonText>
                        </View>
                    </View>
                    <View style={styles.itemLine}>
                        <View style={styles.itemLineIcon}>
                            <Address/>
                        </View>
                        <View style={styles.itemLineText}>
                            <CommonText style={{fontSize: ResponsiveUtil.font(12)}} numberOfLines={2}>{item.shipping.address_1}, {item.shipping.city}, {item.shipping.state}, {item.shipping.country}, {item.shipping.postcode}</CommonText>
                        </View>
                    </View>
                    <View style={styles.itemLine}>
                        <View style={styles.itemLineIcon}>
                            <PayPal/>
                        </View>
                        <View style={styles.itemLineText}>
                            <CommonNumberFormat value={item.total}/>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <CommonButton style={[styles.button, {
                            marginRight: ResponsiveUtil.width(10),
                            backgroundColor: '#dedede',
                        }]} label={lang.seeDetails} onPress={() => {
                            navigation.navigate('OrderHistoryDetailScreen', {item: item});
                        }}/>
                        <CommonButton style={styles.button} label={lang.reorder}/>
                    </View>

                </View>
            </TouchableOpacity>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.scanner} onPress={() => {
                    navigation.goBack();
                }}>
                    <Back/>
                </TouchableOpacity>
                <CommonText style={{fontSize: 20}}>{lang.orderHistory}</CommonText>
                <TouchableOpacity style={styles.scanner}>
                    <Bell/>
                </TouchableOpacity>
            </View>
            <ScrollableTabView
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar/>}
                tabBarTextStyle={styles.label}
                tabBarUnderlineStyle={{backgroundColor: ColorUtil.black}}
            >
                <View tabLabel={lang.onGoing} style={styles.tabContainer}>
                    <FlatGrid
                        style={{
                            marginLeft: ResponsiveUtil.width(-5),
                            height: ResponsiveUtil.screenHeight() - 165,
                            width: '100%',
                        }}
                        data={ongoingOrders}
                        itemDimension={335}
                        renderItem={categoryItem}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={false}
                    />
                </View>
                <View tabLabel={lang.success} style={styles.tabContainer}>
                    <FlatGrid
                        style={{
                            marginLeft: ResponsiveUtil.width(-5),
                            height: ResponsiveUtil.screenHeight() - 165,
                            width: '100%',
                        }}
                        data={completeOrders}
                        itemDimension={335}
                        renderItem={categoryItem}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={false}
                    />
                </View>

                <View tabLabel={lang.cancelled} style={styles.tabContainer}>
                    <FlatGrid
                        style={{
                            marginLeft: ResponsiveUtil.width(-5),
                            height: ResponsiveUtil.screenHeight() - 165,
                            width: '100%',
                        }}
                        data={cancelledOrders}
                        itemDimension={335}
                        renderItem={categoryItem}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={false}
                    />
                </View>
            </ScrollableTabView>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabContainer: {
        padding: ResponsiveUtil.width(15),
    },
    label: {
        fontSize: ResponsiveUtil.font(12),
        color: '#000',
    },
    item: {
        width: ResponsiveUtil.width(335),
        height: ResponsiveUtil.height(165),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F6F8',
        padding: ResponsiveUtil.width(15),
        borderRadius: ResponsiveUtil.width(10),

    },
    qrCode: {
        width: ResponsiveUtil.width(80),
        height: ResponsiveUtil.width(80),
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemInformation: {
        flex: 1,
        height: '100%',
    },
    itemLine: {
        height: ResponsiveUtil.height(32),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: ResponsiveUtil.height(2),
        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15),
    },
    itemLineIcon: {
        height: ResponsiveUtil.height(32),
        width: ResponsiveUtil.height(32),
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemLineText: {
        height: ResponsiveUtil.height(32),
        width: '100%',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '100%',
        height: ResponsiveUtil.height(32),
    },
    button: {
        height: ResponsiveUtil.height(32),
        width: ResponsiveUtil.width(90),
    },

});
