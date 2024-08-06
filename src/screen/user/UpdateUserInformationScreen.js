import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';
import Back from '../../component/icon/Back';
import {Controller, useForm} from 'react-hook-form';
import CommonTextInput from '../../component/common/CommonTextInput';
import Mail from '../../component/icon/Mail';
import User from '../../component/icon/User';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import CommonLoading from '../../component/common/CommonLoading';
import {ColorUtil} from '../../util/ColorUtil';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import CommonButton from '../../component/common/CommonButton';
import Locker from '../../component/icon/Locker';
import Eye from '../../component/icon/Eye';
import {UserAction} from '../../persistence/user/UserAction';
import CommonToast from '../../component/common/CommonToast';

export default function UpdateUserInformationScreen({route, navigation}) {
    const user = useSelector(state => state.UserReducer.data.user);
    const firebaseUser = useSelector(state => state.UserReducer.data.firebaseUser);
    const lang = useSelector(state => state.LanguageReducer.language);
    const dispatch = useDispatch();
    const schema = yup.object().shape({
        email: yup.string().required(lang.email + ' ' + lang.isARequiredField),
        username: yup.string().required(lang.username + ' ' + lang.isARequiredField),
        last_name: yup.string().required(lang.lastName + ' ' + lang.isARequiredField),
        first_name: yup.string().required(lang.firstName + ' ' + lang.isARequiredField),
    });
    const {control, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = data => {
        CommonLoading.show();
        dispatch(UserAction.updateProfile('customers/'+user.id, data)).then((response) => {
            if(response.success){
                CommonToast.success({
                    message : lang.success
                })
                CommonLoading.hide();
            }else{
                CommonToast.error({
                    message : lang.sorryOurSystem
                });
                CommonLoading.hide();
            }
        });
    };
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    let profileImg = require('../../../assets/avatar1.png');
    if (!_.isEmpty(firebaseUser) && firebaseUser.user.photoURL) {
        profileImg = {
            uri: firebaseUser.user.photoURL,
        };
    }
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.scanner} onPress={() => {
                        navigation.goBack();
                    }}>
                        <Back/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.scanner}>

                    </TouchableOpacity>
                </View>
                <View style={styles.image}>
                    <FastImage
                        source={profileImg}
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.avatar}/>
                </View>
                <View style={styles.body}>
                    <View style={styles.form}>
                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <CommonTextInput
                                    leftIcon={<Mail/>}
                                    label={lang.email}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    error={errors['email']}
                                    editable={false}
                                />
                            )}
                            name="email"
                            defaultValue={user.email}

                        />
                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <CommonTextInput
                                    leftIcon={<User/>}
                                    label={lang.username}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    style={{marginTop: ResponsiveUtil.height(20)}}
                                    error={errors['username']}
                                    editable={false}
                                />
                            )}
                            name="username"
                            defaultValue={user.username}

                        />
                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <CommonTextInput
                                    label={lang.firstName}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    style={{marginTop: ResponsiveUtil.height(20)}}
                                    error={errors['first_name']}
                                />
                            )}
                            name="first_name"
                            defaultValue={user.first_name}
                        />
                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <CommonTextInput
                                    label={lang.lastName}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    style={{marginTop: ResponsiveUtil.height(20)}}
                                    error={errors['last_name']}
                                />
                            )}
                            name="last_name"
                            defaultValue={user.last_name}
                        />
                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <CommonTextInput
                                    leftIcon={<Locker/>} label={lang.password}
                                    rightIcon={<Eye/>}
                                    onRightIconClick={() => {
                                        setSecureTextEntry(!secureTextEntry);
                                    }}
                                    style={{marginTop: ResponsiveUtil.height(20)}}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    error={errors['password']}
                                    secureTextEntry={secureTextEntry}
                                />
                            )}
                            name="password"
                            defaultValue=""
                        />
                    </View>
                </View>
                <View style={styles.checkOutContainer}>
                    <CommonButton label={lang.save} style={{elevation: 2}} onPress={handleSubmit(onSubmit)}/>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    body: {
        marginTop: ResponsiveUtil.height2(250,250 - ResponsiveUtil.statusBarHeight()),
        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15),
    },
    content: {
        flex: 1,
    },
    topBar: {
        marginTop : ResponsiveUtil.height2(0,ResponsiveUtil.statusBarHeight()),
        height: ResponsiveUtil.statusBarHeight(),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15),
        zIndex: 9999
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: ResponsiveUtil.screenWidth(),
        backgroundColor: ColorUtil.lightpink,
        height: ResponsiveUtil.height(250),
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        height: ResponsiveUtil.width(120),
        width: ResponsiveUtil.width(120),
        borderRadius: 8000,
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
