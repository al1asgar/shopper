import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CreditCardInput} from 'react-native-credit-card-input';
import Back from '../../component/icon/Back';
import CommonText from '../../component/common/CommonText';
import Bell from '../../component/icon/Bell';
import CommonButton from '../../component/common/CommonButton';
import {CardAction} from '../../persistence/card/CardAction';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';
import CommonLoading from '../../component/common/CommonLoading';

export default function UpdateCardScreen({route, navigation}) {
    const cardInformation = route.params.item;
    const lang = useSelector(state => state.LanguageReducer.language);
    const dispatch = useDispatch();
    const [form, setForm] = useState({status: {}});
    useEffect(() => {
        this.CCInput.setValues({
            number: cardInformation.cardNo,
            name: cardInformation.holderName,
            expiry: cardInformation.expiryDate,
            cvc: cardInformation.cvv,
        });
    }, []);
    const errors = (data) => {
        if (data.valid) {
            return '';
        }
        const status = data.status;
        let errs = '';
        for (const [key, value] of Object.entries(status)) {
            errs += (`${key}: ${value}\n`);

        }
        return errs;
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1}}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.scanner} onPress={() => {
                        navigation.goBack();
                    }}>
                        <Back/>
                    </TouchableOpacity>
                    <CommonText style={{fontSize : 20}}>{lang.updateACard}</CommonText>
                    <TouchableOpacity style={styles.scanner}>
                        <Bell/>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <CreditCardInput
                        allowScroll={true}
                        requiresName={true}
                        onChange={value => {
                            console.log(value);
                            setForm(value);
                        }}
                        ref={(c) => this.CCInput = c}
                    />
                    <CommonText>{errors(form)}</CommonText>
                </View>
            </View>
            <View style={styles.checkOutContainer}>
                <CommonButton label={'Save'} style={{elevation: 2}} onPress={() => {
                    if (form.valid) {
                        CommonLoading.show();
                        const card = {
                            id: cardInformation.id,
                            holderName: form.values.name,
                            expiryDate: form.values.expiry,
                            cvv: form.values.cvc,
                            cardNo: form.values.number,
                            type: form.values.type,
                        };
                        dispatch(CardAction.updateItem(card)).then(data => {
                            CommonLoading.hide();
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
        width: '100%',
        height: ResponsiveUtil.height(300),
        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15),
        alignItems: 'center',
    },
    card: {
        width: ResponsiveUtil.width(305),
        backgroundColor: '#F8B6C3',
        height: ResponsiveUtil.width(172),
        borderRadius: ResponsiveUtil.width(20),
        paddingTop: ResponsiveUtil.width(15),
        paddingBottom: ResponsiveUtil.width(15),
        paddingLeft: ResponsiveUtil.width(25),
        paddingRight: ResponsiveUtil.width(25),
        justifyContent: 'space-between',
    },
    cardLogo: {
        width: '100%',
        height: ResponsiveUtil.width(45),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15),
    },
    cardNumber: {
        width: '100%',
        height: ResponsiveUtil.width(45),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15),
    },
    cardOwner: {
        width: '100%',
        height: ResponsiveUtil.width(45),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15),
    },
    information: {
        flex: 1,
        marginTop: ResponsiveUtil.width(25),
        paddingLeft: ResponsiveUtil.width(25),
        paddingRight: ResponsiveUtil.width(25),
    },
    time: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    expiryDate: {
        width: '50%',
    },
    cvv: {
        width: '49%',
    },
    checkOutContainer: {
        width: '100%',
        height: ResponsiveUtil.height(54),
        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15),
        backgroundColor: '#fff',
    },

});
