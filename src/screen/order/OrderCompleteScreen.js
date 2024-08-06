import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import PaymentSuccess from '../../component/icon/PaymentSuccess';
import CommonText from '../../component/common/CommonText';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';
import PaymentFailed from '../../component/icon/PaymentFailed';
import CommonLine from '../../component/common/CommonLine';
import Notice from '../../component/icon/Notice';
import DoNotWorry from '../../component/icon/DoNotWorry';
import Back from '../../component/icon/Back';
import Bell from '../../component/icon/Bell';
import CommonButton from '../../component/common/CommonButton';
import {ColorUtil} from '../../util/ColorUtil';

export default function OrderCompleteScreen({route, navigation}) {
    const lang = useSelector(state => state.LanguageReducer.language);
    const {success} = route.params;
    const title = success ? lang.seeOrderDetails : lang.reviewPaymentMethod;
    const complete = (
        <>
            <PaymentSuccess/>
            <CommonText style={{
                fontSize: ResponsiveUtil.font(24),
                lineHeight: ResponsiveUtil.height(32),
                marginTop: ResponsiveUtil.height(24),
            }}>{lang.paymentSuccessful}</CommonText>
            <CommonText style={{
                fontSize: ResponsiveUtil.font(16),
                lineHeight: ResponsiveUtil.height(32),
            }}>{lang.yourOrderWillArriveInNDays}</CommonText>
        </>
    );
    const failed = (
        <>
            <PaymentFailed/>
            <CommonText style={{
                fontSize: ResponsiveUtil.font(24),
                lineHeight: ResponsiveUtil.height(32),
                marginTop: ResponsiveUtil.height(24),
            }}>{lang.orderFailed}</CommonText>
            <CommonText style={{
                fontSize: ResponsiveUtil.font(16),
                lineHeight: ResponsiveUtil.height(32),
            }}>{lang.yourPaymentOccurredAnError}</CommonText>
            <CommonLine/>
            <Notice style={{marginTop: ResponsiveUtil.height(24)}}/>
            <DoNotWorry style={{marginTop: ResponsiveUtil.height(24)}}/>
            <CommonText style={{
                fontSize: ResponsiveUtil.font(12),
                lineHeight: ResponsiveUtil.height(32),
            }}>{lang.keepCalmSometimesItHappens}</CommonText>
            <CommonText style={{
                fontSize: ResponsiveUtil.font(12),
                lineHeight: ResponsiveUtil.height(32),
            }}>{lang.pleaseGoBackAndCheckYourPaymentMethod}</CommonText>
            <CommonText style={{
                fontSize: ResponsiveUtil.font(12),
                lineHeight: ResponsiveUtil.height(32),
            }}>{lang.orContactUs}</CommonText>
        </>
    );
    useEffect(() => {

    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1}}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.scanner} onPress={() => {
                        navigation.goBack();
                    }}>
                        <Back/>
                    </TouchableOpacity>
                    <CommonText style={{fontSize : 20}}>{lang.orderComplete}</CommonText>
                    <TouchableOpacity style={styles.scanner}>
                        <Bell/>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    {
                        success ? complete : failed
                    }
                </View>
            </View>
            <View style={styles.checkOutContainer}>
                <View style={styles.checkoutButton}>
                    <CommonButton label={title} style={{elevation: 2}} onPress={() => {
                        if (success) {
                            navigation.navigate('MainScreen');
                        } else {
                            navigation.navigate('Payment');
                        }
                    }}/>
                </View>
                {
                    !success &&
                    <View style={styles.checkoutButton}>
                        <CommonButton label={lang.chatWithUs + '...'} style={{
                            elevation: 2,
                            backgroundColor: ColorUtil.black,
                        }} onPress={() => {
                        }}/>
                    </View>

                }
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkOutContainer: {
        width: '100%',
        height: ResponsiveUtil.height(146),
        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15),
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: ResponsiveUtil.height2(0,20),
    },
    checkoutButton: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: ResponsiveUtil.height(6),
    },
});
