import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {Marker} from 'react-native-maps';
import _ from 'lodash';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import uuid from 'react-native-uuid';
import {AddressAction} from "../../persistence/address/AdressAction";
import Back from "../../component/icon/Back";
import Bell from "../../component/icon/Bell";
import CommonText from "../../component/common/CommonText";
import {ApplicationProperties} from "../../application.properties";
import {ResponsiveUtil} from "../../util/ResponsiveUtil";
import Search from "../../component/icon/Search";
import CommonLine from "../../component/common/CommonLine";
import CommonTextInput from "../../component/common/CommonTextInput";
import CommonButton from "../../component/common/CommonButton";
import Geolocation from '@react-native-community/geolocation';
navigator.geolocation = require('@react-native-community/geolocation');
export default function AddAddressScreen({navigation}) {
    const lang = useSelector(state => state.LanguageReducer.language);
    const schema = yup.object().shape({
        firstName: yup.string().required(lang.firstName + ' ' + lang.isARequiredField),
        lastName: yup.string().required(lang.lastName + ' ' + lang.isARequiredField),
        phoneNumber: yup.string().required(lang.phoneNumber + ' ' + lang.isARequiredField),
        email: yup.string().required(lang.lastName + ' ' + lang.isARequiredField),
        address_1: yup.string().required(lang.street + ' ' + lang.isARequiredField),
        country: yup.string().required(lang.country + ' ' + lang.isARequiredField),
        city: yup.string().required(lang.city + ' ' + lang.isARequiredField),
        state: yup.string().required(lang.state + ' ' + lang.isARequiredField),
        postal_code: yup.string().required(lang.postalCode + ' ' + lang.isARequiredField),
    });
    const {control, setValue, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();
    const [addressDetails, setAddressDetails] = useState({
        place_id: uuid.v4()
    });
    const user = useSelector(state => state.UserReducer.data.user);
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const getAddressInformation = (data) => {
        const address = {
            street_number: {
                long_name: '',
                short_name: ''
            },
            route: {
                long_name: '',
                short_name: ''
            },
            neighborhood: {
                long_name: '',
                short_name: ''
            },
            sublocality: {
                long_name: '',
                short_name: ''
            },
            administrative_area_level_2: {
                long_name: '',
                short_name: ''
            },
            administrative_area_level_1: {
                long_name: '',
                short_name: ''
            },
            country: {
                long_name: '',
                short_name: ''
            },
            postal_code: {
                long_name: '',
                short_name: ''
            },
        };
        _.map(data, function (o) {
            const street_number = _.find(o.types, function (type) {
                return type === 'street_number';
            });
            if (street_number !== undefined) {
                address.street_number = o;
            }
            const route = _.find(o.types, function (type) {
                return type === 'route';
            });
            if (route !== undefined) {
                address.route = o;
            }
            const neighborhood = _.find(o.types, function (type) {
                return type === 'neighborhood';
            });
            if (neighborhood !== undefined) {
                address.neighborhood = o;
            }
            const sublocality = _.find(o.types, function (type) {
                return type === 'sublocality';
            });
            if (sublocality !== undefined) {
                address.sublocality = o;
            }
            const administrative_area_level_2 = _.find(o.types, function (type) {
                return type === 'administrative_area_level_2';
            });
            if (administrative_area_level_2 !== undefined) {
                address.administrative_area_level_2 = o;
            }
            const administrative_area_level_1 = _.find(o.types, function (type) {
                return type === 'administrative_area_level_1';
            });
            if (administrative_area_level_1 !== undefined) {
                address.administrative_area_level_1 = o;
            }
            const country = _.find(o.types, function (type) {
                return type === 'country';
            });
            if (country !== undefined) {
                address.country = o;
            }
            const postal_code = _.find(o.types, function (type) {
                return type === 'postal_code';
            });
            if (postal_code !== undefined) {
                address.postal_code = o;
            }
        });
        return address;
    };

    useEffect(() => {
        Geolocation.getCurrentPosition(info => {
            setRegion({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
                latitudeDelta: 0.0041,
                longitudeDelta: 0.0021,
            });
        }, (error) => {
            console.log(error);
        }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    }, []);

    const onSubmit = data => {
        const address = {
            physicalAddress: data,
            geoAddress: addressDetails
        };
        dispatch(AddressAction.addOrUpdateAddress({value: address})).then(data => {
            navigation.goBack();
        });
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
                    <TouchableOpacity style={styles.scanner}>
                        <Bell/>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <View style={{flex: 1}}>
                        <MapView
                            style={{...StyleSheet.absoluteFillObject}}
                            region={region}>
                            <Marker
                                key={1}
                                coordinate={{
                                    latitude: region.latitude,
                                    longitude: region.longitude,
                                }}
                            />
                        </MapView>
                    </View>
                    <View style={styles.addressContainer}>
                        <View style={styles.searchInput}>
                            <GooglePlacesAutocomplete
                                placeholder={lang.enterYourAddress}
                                fetchDetails
                                onPress={(data, details = null) => {
                                    setRegion({
                                        latitude: details.geometry.location.lat,
                                        longitude: details.geometry.location.lng,
                                        latitudeDelta: 0.0041,
                                        longitudeDelta: 0.0021,
                                    });
                                    setAddressDetails(details);
                                    const address = getAddressInformation(details.address_components);
                                    setValue('address_1', address.street_number.long_name + ' ' + address.route.long_name, true);
                                    setValue('address_2', address.neighborhood.long_name + ' ' + address.sublocality.long_name, true);
                                    setValue('city', address.administrative_area_level_1.long_name, true);
                                    setValue('state', address.administrative_area_level_1.short_name, true);
                                    setValue('country', address.country.short_name, true);
                                    setValue('postal_code', address.postal_code.short_name, true);
                                }}
                                query={{
                                    key: ApplicationProperties.googleMapApiKey,
                                    language: 'en',
                                }}
                                currentLocation={true}
                                currentLocationLabel={lang.currentLocation}
                                styles={{
                                    textInputContainer: {},
                                    textInput: {
                                        height: ResponsiveUtil.height(48),
                                        fontSize: ResponsiveUtil.font(16),
                                        color: '#000',
                                        fontWeight: '600',
                                        backgroundColor: '#F3F6F8',
                                        paddingRight: ResponsiveUtil.width(35),

                                    },
                                    poweredContainer: {
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        borderBottomRightRadius: 5,
                                        borderBottomLeftRadius: 5,
                                        borderColor: '#c8c7cc',
                                        borderTopWidth: 0.5,
                                    },
                                    powered: {},
                                    listView: {
                                        backgroundColor: '#FFFFFF',
                                    },
                                    row: {
                                        backgroundColor: '#FFFFFF',
                                        padding: 13,
                                        height: 44,
                                        flexDirection: 'row',
                                    },
                                    separator: {
                                        height: 0.5,
                                        backgroundColor: '#c8c7cc',
                                    },
                                    description: {},
                                    loader: {
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        height: 20,
                                    },
                                }}
                            />
                            <View style={styles.searchIcon}>
                                <Search/>
                            </View>
                        </View>
                        <View style={styles.myAddress}>
                            <ScrollView>
                                <CommonLine style={{marginBottom: ResponsiveUtil.height(12)}}/>
                                <View style={styles.receiverInformation}>
                                    <View style={{width: '100%', flexDirection: 'row'}}>
                                        <View style={{width: '48%', marginRight: '1%'}}>
                                            <Controller
                                                control={control}
                                                render={({onChange, onBlur, value}) => (
                                                    <CommonTextInput
                                                        label={lang.firstName}
                                                        onBlur={onBlur}
                                                        onChangeText={value => onChange(value)}
                                                        value={value}
                                                        style={{marginTop: ResponsiveUtil.height(16)}}
                                                        error={errors['firstName']}
                                                    />
                                                )}
                                                name="firstName"
                                                defaultValue={user.first_name}

                                            />
                                        </View>
                                        <View style={{width: '48%', marginLeft: '1%'}}>
                                            <Controller
                                                control={control}
                                                render={({onChange, onBlur, value}) => (
                                                    <CommonTextInput
                                                        label={lang.lastName}
                                                        onBlur={onBlur}
                                                        onChangeText={value => onChange(value)}
                                                        value={value}
                                                        style={{marginTop: ResponsiveUtil.height(16)}}
                                                        error={errors['lastName']}
                                                    />
                                                )}
                                                name="lastName"
                                                defaultValue={user.last_name}
                                            />
                                        </View>
                                    </View>
                                    <View style={{width: '100%', flexDirection: 'row'}}>
                                        <View style={{width: '48%', marginRight: '1%'}}>
                                            <Controller
                                                control={control}
                                                render={({onChange, onBlur, value}) => (
                                                    <CommonTextInput
                                                        label={lang.phoneNumber}
                                                        onBlur={onBlur}
                                                        onChangeText={value => onChange(value)}
                                                        value={value}
                                                        style={{marginTop: ResponsiveUtil.height(16)}}
                                                        error={errors['phoneNumber']}
                                                    />
                                                )}
                                                name="phoneNumber"
                                                defaultValue={''}

                                            />
                                        </View>
                                        <View style={{width: '48%', marginLeft: '1%'}}>
                                            <Controller
                                                control={control}
                                                render={({onChange, onBlur, value}) => (
                                                    <CommonTextInput
                                                        label={lang.email}
                                                        onBlur={onBlur}
                                                        onChangeText={value => onChange(value)}
                                                        value={value}
                                                        style={{marginTop: ResponsiveUtil.height(16)}}
                                                        error={errors['email']}
                                                    />
                                                )}
                                                name="email"
                                                defaultValue={''}
                                            />
                                        </View>
                                    </View>
                                    <View style={{width: '100%', flexDirection: 'row'}}>
                                        <Controller
                                            control={control}
                                            render={({onChange, onBlur, value}) => (
                                                <CommonTextInput
                                                    label={lang.street}
                                                    onBlur={onBlur}
                                                    onChangeText={value => onChange(value)}
                                                    value={value}
                                                    style={{marginTop: ResponsiveUtil.height(16)}}
                                                    error={errors['address_1']}
                                                />
                                            )}
                                            name="address_1"
                                            defaultValue={''}

                                        />
                                    </View>
                                    <View style={{width: '100%', flexDirection: 'row'}}>
                                        <Controller
                                            control={control}
                                            render={({onChange, onBlur, value}) => (
                                                <CommonTextInput
                                                    label={lang.unit}
                                                    onBlur={onBlur}
                                                    onChangeText={value => onChange(value)}
                                                    value={value}
                                                    style={{marginTop: ResponsiveUtil.height(16)}}
                                                    error={errors['address_2']}
                                                />
                                            )}
                                            name="address_2"
                                            defaultValue={''}
                                        />
                                    </View>
                                    <View style={{width: '100%', flexDirection: 'row'}}>
                                        <Controller
                                            control={control}
                                            render={({onChange, onBlur, value}) => (
                                                <CommonTextInput
                                                    label={lang.city}
                                                    onBlur={onBlur}
                                                    onChangeText={value => onChange(value)}
                                                    value={value}
                                                    style={{marginTop: ResponsiveUtil.height(16)}}
                                                    error={errors['city']}
                                                />
                                            )}
                                            name="city"
                                            defaultValue={''}
                                        />
                                    </View>

                                    <View style={{width: '100%', flexDirection: 'row'}}>
                                        <Controller
                                            control={control}
                                            render={({onChange, onBlur, value}) => (
                                                <CommonTextInput
                                                    label={lang.state}
                                                    onBlur={onBlur}
                                                    onChangeText={value => onChange(value)}
                                                    value={value}
                                                    style={{marginTop: ResponsiveUtil.height(16)}}
                                                    error={errors['state']}
                                                />
                                            )}
                                            name="state"
                                            defaultValue={''}
                                        />
                                    </View>
                                    <View style={{width: '100%', flexDirection: 'row'}}>
                                        <Controller
                                            control={control}
                                            render={({onChange, onBlur, value}) => (
                                                <CommonTextInput
                                                    label={lang.postalCode}
                                                    onBlur={onBlur}
                                                    onChangeText={value => onChange(value)}
                                                    value={value}
                                                    style={{marginTop: ResponsiveUtil.height(16)}}
                                                    error={errors['postal_code']}
                                                />
                                            )}
                                            name="postal_code"
                                            defaultValue={''}
                                        />
                                    </View>
                                    <View style={{width: '100%', flexDirection: 'row'}}>
                                        <Controller
                                            control={control}
                                            render={({onChange, onBlur, value}) => (
                                                <CommonTextInput
                                                    label={lang.country}
                                                    onBlur={onBlur}
                                                    onChangeText={value => onChange(value)}
                                                    value={value}
                                                    style={{marginTop: ResponsiveUtil.height(16)}}
                                                    error={errors['country']}
                                                />
                                            )}
                                            name="country"
                                            defaultValue={''}
                                        />
                                    </View>

                                </View>
                            </ScrollView>
                        </View>

                    </View>
                </View>
            </View>
            <CommonLine/>
            <View style={styles.checkOutContainer}>
                <CommonButton label={lang.save} style={{elevation: 2}} onPress={handleSubmit(onSubmit)}/>
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
        marginTop: ResponsiveUtil.height(24),
    },
    myAddress: {
        width: '100%',
        height: ResponsiveUtil.height(380),
        marginTop: ResponsiveUtil.height(76),
    },
    addressItem: {
        width: '100%',
        height: ResponsiveUtil.height(85),
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
