import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {FlatGrid} from 'react-native-super-grid';
import {useFocusEffect} from '@react-navigation/native';
import {AddressAction} from "../../persistence/address/AdressAction";
import CommonText from "../../component/common/CommonText";
import {ResponsiveUtil} from "../../util/ResponsiveUtil";
import Select from "../../component/icon/Select";
import Address from "../../component/icon/Address";
import Back from "../../component/icon/Back";
import Add from "../../component/icon/Add";
import CommonButton from "../../component/common/CommonButton";
import CommonLine from "../../component/common/CommonLine";
import CommonToast from '../../component/common/CommonToast';
import _ from 'lodash';
export default function AddressScreen({navigation,route}) {
    const isAddressManagement = !_.isEmpty(route.params) && route.params.isAddressManagement;
    const lang = useSelector(state => state.LanguageReducer.language);
    const dispatch = useDispatch();
    const shippingAddresses = useSelector(state => state.AddressReducer.data.addresses);

    const [selectedAddress, setSelectedAddress] = useState({
        geoAddress: {
            place_id: '',
        }
    });
    useFocusEffect(
        React.useCallback(() => {
            dispatch(AddressAction.getAllAddresses({}));
        }, [])
    );
    const onSubmit = data => {
        if (selectedAddress.geoAddress.place_id === '') {
            CommonToast.error({
                message : lang.pleaseSelectYourShippingAddress
            })
        } else {
            navigation.navigate('OrderReviewScreen', {selectedAddress});
        }
    };
    const addressItem = ({item}) => {
        const isSelected = item.geoAddress.place_id === selectedAddress.geoAddress.place_id;
        return (
            <View style={styles.addressItem}>
                <View style={styles.addressIcon}>
                    <Address/>
                </View>
                <TouchableOpacity style={styles.addressDetail} onPress={() => {
                    navigation.navigate("UpdateAddressScreen", {item: item})
                }}>
                    <CommonText style={{}}>{item.physicalAddress.firstName} {item.physicalAddress.lastName} {item.physicalAddress.phoneNumber}</CommonText>
                    <CommonText style={{
                        fontSize: ResponsiveUtil.font(12),
                        color: '#767676',
                    }}>{item.geoAddress.address_components[3].long_name}, {item.geoAddress.address_components[4].long_name}</CommonText>
                    <CommonText numberOfLines={2}>{item.geoAddress.formatted_address}</CommonText>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9} style={styles.addressSelect} onPress={() => {
                    setSelectedAddress(item);
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
                    <CommonText style={{fontSize : 20}}>{lang.shippingAddress}</CommonText>
                    <TouchableOpacity style={styles.scanner} onPress={() => {
                        navigation.navigate('AddAddressScreen');
                    }}>
                        <Add/>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <View style={styles.addressContainer}>
                        <View style={styles.myAddress}>
                            <FlatGrid
                                style={{height: ResponsiveUtil.height(375)}}
                                itemDimension={ResponsiveUtil.height(375)}
                                data={shippingAddresses}
                                renderItem={addressItem}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </View>
                </View>
            </View>
            {
                !isAddressManagement && <CommonLine/>
                &&
                <View style={styles.checkOutContainer}>
                    <CommonButton label={lang.continueToPayment} style={{elevation: 2}} onPress={onSubmit}/>
                </View>
            }

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content : {
        flex: 1
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
        height: ResponsiveUtil.height(530),
    },
    myAddress: {
        width: '100%',
        height: ResponsiveUtil.height(374)
    },
    addressItem: {
        width: '100%',
        height: ResponsiveUtil.height(115),
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
    receiverInformation: {
        width: '100%',
        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15),
    },
});
