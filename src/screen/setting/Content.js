import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Constant} from './Constant';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import CommonText from '../../component/common/CommonText';
import ChevronLeft from '../../component/icon/ChevronLeft';
import {UserAction} from '../../persistence/user/UserAction';
import Logout from '../../component/icon/Logout';
import CommonLine from '../../component/common/CommonLine';
import OrderHistory from '../../component/icon/OrderHistory';
import Wishlist from '../../component/icon/AddWishlist';
import Point from '../../component/icon/Point';
import Notification from '../../component/icon/Notification';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';
import CommonSwitcher from '../../component/common/CommonSwitcher';
import Message from '../../component/icon/Message';
import Language from '../../component/icon/Language';
import CommonCountryPicker from '../../component/common/CommonCountryPicker';
import Currency from '../../component/icon/Currency';
import Rate from '../../component/icon/Rate';
import Privacy from '../../component/icon/Privacy';
import AboutUs from '../../component/icon/AboutUs';
import User2 from '../../component/icon/User2';
import Address from '../../component/icon/Address';
import Address2 from '../../component/icon/Address2';

export default ({item, ...rest}) => {
    const dispatch = useDispatch();
    let currencyPickerRef = null;
    const navigation = useNavigation();
    const isLoggedIn = useSelector(state => state.UserReducer.data.loggedIn);
    const lang = useSelector(state => state.LanguageReducer.language);
    const [visibleLanguage, setVisibleLanguage] = useState(false);
    useEffect(() => {

    }, []);
    return (
        <>
            <View style={styles.placeholder}></View>
            <View style={styles.body}>
                <TouchableOpacity style={styles.item} onPress={() => {
                    navigation.navigate("UpdateUserInformationScreen");
                }}>
                    <View style={styles.leftIcon}>
                        <User2/>
                    </View>
                    <View style={styles.itemContent}>
                        <CommonText style={styles.label}>{lang.profile}</CommonText>
                    </View>
                    <View style={styles.rightIcon}>
                        <ChevronLeft style={{transform: [{rotate: '180deg'}]}}/>
                    </View>
                </TouchableOpacity>
                <CommonLine/>
                <TouchableOpacity style={styles.item} disabled={!isLoggedIn} onPress={() => {
                    navigation.navigate('OrderHistoryScreen');
                }}>
                    <View style={styles.leftIcon}>
                        <OrderHistory/>
                    </View>
                    <View style={styles.itemContent}>
                        <CommonText style={styles.label}>{lang.orderHistory}</CommonText>
                    </View>
                    <View style={styles.rightIcon}>
                        <ChevronLeft style={{transform: [{rotate: '180deg'}]}}/>
                    </View>
                </TouchableOpacity>
                <CommonLine/>
                <TouchableOpacity style={styles.item} disabled={!isLoggedIn} onPress={() => {
                    navigation.navigate('ContactScreen');
                }}>
                    <View style={styles.leftIcon}>
                        <Message/>
                    </View>
                    <View style={styles.itemContent}>
                        <CommonText style={styles.label}>{lang.message}</CommonText>
                    </View>
                    <View style={styles.rightIcon}>
                        <ChevronLeft style={{transform: [{rotate: '180deg'}]}}/>
                    </View>
                </TouchableOpacity>
                <CommonLine/>
                <TouchableOpacity style={styles.item} onPress={() => {
                    navigation.navigate("AddressScreen",{isAddressManagement : true});
                }}>
                    <View style={styles.leftIcon}>
                        <Address2/>
                    </View>
                    <View style={styles.itemContent}>
                        <CommonText style={styles.label}>{lang.shippingAddress}</CommonText>
                    </View>
                    <View style={styles.rightIcon}>
                        <ChevronLeft style={{transform: [{rotate: '180deg'}]}}/>
                    </View>
                </TouchableOpacity>
                <CommonLine/>
                <TouchableOpacity style={styles.item} disabled={!isLoggedIn} onPress={() => {
                    navigation.navigate('WishListScreen');
                }}>
                    <View style={styles.leftIcon}>
                        <Wishlist/>
                    </View>
                    <View style={styles.itemContent}>
                        <CommonText style={styles.label}>{lang.wishlist}</CommonText>
                    </View>
                    <View style={styles.rightIcon}>
                        <ChevronLeft style={{transform: [{rotate: '180deg'}]}}/>
                    </View>
                </TouchableOpacity>
                <CommonLine/>
                <TouchableOpacity style={styles.item}>
                    <View style={styles.leftIcon}>
                        <Notification/>
                    </View>
                    <View style={styles.itemContent}>
                        <CommonText style={styles.label}>{lang.enableNotification}</CommonText>
                    </View>
                    <View style={[styles.rightIcon, {width: ResponsiveUtil.width(64)}]}>
                        <CommonSwitcher/>
                    </View>
                </TouchableOpacity>
                <CommonLine/>
                <TouchableOpacity style={styles.item} onPress={() => {
                    setVisibleLanguage(true);
                }}>
                    <View style={styles.leftIcon}>
                        <Language/>
                    </View>
                    <View style={styles.itemContent}>
                        <CommonText style={styles.label}>{lang.language}</CommonText>
                    </View>
                    <View style={[styles.rightIcon, {width: ResponsiveUtil.width(48)}]}>
                        <CommonCountryPicker visible={visibleLanguage} setVisible={setVisibleLanguage}/>
                    </View>
                </TouchableOpacity>
                <CommonLine/>
                <TouchableOpacity style={styles.item} onPress={() => {

                }}>
                    <View style={styles.leftIcon}>
                        <Currency/>
                    </View>
                    <View style={styles.itemContent}>
                        <CommonText style={styles.label}>{lang.currency}</CommonText>
                    </View>
                    <View style={[styles.rightIcon, {width: ResponsiveUtil.width(75)}]}>

                    </View>
                </TouchableOpacity>
                <CommonLine/>
                <TouchableOpacity style={styles.item}>
                    <View style={styles.leftIcon}>
                        <Rate/>
                    </View>
                    <View style={styles.itemContent}>
                        <CommonText style={styles.label}>{lang.rateOurApp}</CommonText>
                    </View>
                    <View style={styles.rightIcon}>
                        <ChevronLeft style={{transform: [{rotate: '180deg'}]}}/>
                    </View>
                </TouchableOpacity>
                <CommonLine/>
                <TouchableOpacity style={styles.item}>
                    <View style={styles.leftIcon}>
                        <Privacy/>
                    </View>
                    <View style={styles.itemContent}>
                        <CommonText style={styles.label}>{lang.privacyAndTerm}</CommonText>
                    </View>
                    <View style={styles.rightIcon}>
                        <ChevronLeft style={{transform: [{rotate: '180deg'}]}}/>
                    </View>
                </TouchableOpacity>
                <CommonLine/>
                <TouchableOpacity style={styles.item}>
                    <View style={styles.leftIcon}>
                        <AboutUs/>
                    </View>
                    <View style={styles.itemContent}>
                        <CommonText style={styles.label}>{lang.aboutUs}</CommonText>
                    </View>
                    <View style={styles.rightIcon}>
                        <ChevronLeft style={{transform: [{rotate: '180deg'}]}}/>
                    </View>
                </TouchableOpacity>
                <CommonLine/>
            </View>

        </>

    );
};
const styles = StyleSheet.create({
    body: {
        width: '100%',
        backgroundColor: '#fff',
        marginTop: ResponsiveUtil.height(8),
    },
    top: {
        width: '100%',
        height: ResponsiveUtil.height(150),
    },
    item: {
        width: '100%',
        height: ResponsiveUtil.width(70),
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftIcon: {
        width: ResponsiveUtil.width(64),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightIcon: {
        width: ResponsiveUtil.width(36),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContent: {
        flex: 1,
    },
    placeholder: {
        height: Constant.HEADER_IMAGE_HEIGHT,
    },
    label: {fontSize: ResponsiveUtil.width(14), fontWeight: '400'},
});
