import * as React from 'react';
import {useState} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View,} from 'react-native';
import CommonTextInput from "../../component/common/CommonTextInput";
import CommonButton from "../../component/common/CommonButton";
import {useDispatch, useSelector} from 'react-redux';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CommonText from "../../component/common/CommonText";
import {ResponsiveUtil} from "../../util/ResponsiveUtil";
import User from "../../component/icon/User";
import Locker from "../../component/icon/Locker";
import Eye from "../../component/icon/Eye";
import FacebookIcon from '../../component/icon/FacebookIcon';
import {getStatusBarHeight} from "react-native-status-bar-height";
import Back from "../../component/icon/Back";
import {ColorUtil} from "../../util/ColorUtil";
import Google from "../../component/icon/Google";
import {UserAction} from "../../persistence/user/UserAction";
import MessageBox from "../../component/icon/MessageBox";
import CommonLoading from '../../component/common/CommonLoading';
import CommonToast from '../../component/common/CommonToast';

export default function SignInScreen({navigation,route}) {
    const dispatch = useDispatch();
    let screenName = null;
    if(route.params){
        screenName = route.params.screenName;
    }
    const lang = useSelector(state => state.LanguageReducer.language);
    const schema = yup.object().shape({
        email: yup.string().required(lang.email + " " + lang.isARequiredField),
        password: yup.string().required(lang.password + " " + lang.isARequiredField),
    });
    const {control, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async data => {
        CommonLoading.show();
        dispatch(UserAction.signIn('customers', data)).then((response) => {
            if (response.success) {
                dispatch(UserAction.signInWithEmail(data.email, data.email)).then(data => {
                    if (!data.success) {
                        CommonToast.error({
                            message : lang.sorryOurSystem
                        })
                    } else {
                        if(screenName){
                            navigation.goBack();
                        }else{
                            CommonLoading.hide();
                            navigation.navigate('BottomTabBarNavigator');
                        }
                    }
                    CommonLoading.hide();
                });
            }else{
                CommonLoading.hide();
                CommonToast.error({
                    message : lang.invalidCredential
                })
            }

        });
    };
    const signInWithFacebook = () => {
        CommonLoading.show();
        dispatch(UserAction.signInWithFacebook()).then(response => {
            if (response.success) {
                const {isNewUser,profile} = response.data.additionalUserInfo;
                if(!isNewUser){
                    dispatch(UserAction.signIn('customers',{
                        email : profile.email,
                        password : profile.email
                    })).then(data => {
                        if (!data.success) {
                            CommonToast.error({
                                message : lang.sorryOurSystem
                            });
                            navigation.goBack();
                        } else {
                            if(screenName){
                                navigation.goBack();
                            }else{
                                CommonLoading.hide();
                                navigation.navigate('BottomTabBarNavigator');
                            }
                        }
                        CommonLoading.hide();
                    });
                }else{
                    const newUser = {
                        email : profile.email,
                        username : profile.first_name.toLowerCase()+"."+profile.last_name.toLowerCase(),
                        password : profile.email,
                        first_name: profile.first_name,
                        last_name: profile.last_name,
                    }
                    dispatch(UserAction.signUp('customers', newUser)).then(data => {
                        if(data.success){
                            if(screenName){
                                navigation.goBack();
                            }else{
                                CommonLoading.hide();
                                navigation.navigate('BottomTabBarNavigator');
                            }
                        }else{
                            CommonToast.error({
                                message : lang.sorryOurSystem
                            });
                            CommonLoading.hide();
                        }

                    });
                }
            }else{
                CommonToast.error({
                    message : lang.invalidCredential
                });
                CommonLoading.hide();

            }
        })
    }
    const signInWithGoogle = () => {
    CommonLoading.show();
        dispatch(UserAction.signInWithGoogle()).then(response => {
            if (response.success) {
                const {isNewUser,profile} = response.data.additionalUserInfo;
                if(!isNewUser){
                    dispatch(UserAction.signIn('customers',{
                        email : profile.email,
                        password : profile.email
                    })).then(data => {
                        if (!data.success) {
                            CommonToast.error({
                                message : lang.sorryOurSystem
                            });
                            navigation.goBack();
                        } else {
                            if(screenName){
                                navigation.goBack();
                            }else{
                                CommonLoading.hide();
                                navigation.navigate('BottomTabBarNavigator');
                            }
                        }
                        CommonLoading.hide();
                    });
                }else{
                    const newUser = {
                        email : profile.email,
                        username : profile.first_name.toLowerCase()+"."+profile.last_name.toLowerCase(),
                        first_name: profile.first_name,
                        last_name: profile.last_name,
                    }
                    dispatch(UserAction.signUp('customers', newUser)).then(data => {
                        if(data.success){
                            if(screenName){
                                navigation.goBack();
                            }else{
                                CommonLoading.hide();
                                navigation.navigate('BottomTabBarNavigator');
                            }
                        }else{
                            CommonToast.error({
                                message : lang.sorryOurSystem
                            });
                            CommonLoading.hide();
                        }
                    });
                }
            }else{
                CommonToast.error({
                    message : lang.invalidCredential
                });
                CommonLoading.hide();

            }
        })
    }
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.scanner} onPress={() => {
                        navigation.goBack();
                    }}>
                        <Back/>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <View style={styles.title}>
                        <CommonText style={{
                            fontSize: ResponsiveUtil.font(24),
                            fontWeight: 'bold',
                            lineHeight: ResponsiveUtil.height(32),
                            marginBottom: ResponsiveUtil.height(8),
                        }}>{lang.letSignYouIn}</CommonText>
                        <CommonText style={{
                            fontSize: ResponsiveUtil.font(14),
                            color: '#6a6a6a',
                            lineHeight: ResponsiveUtil.height(24),
                        }}>{lang.welcomeBack}</CommonText>
                    </View>
                    <View style={styles.form}>
                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <CommonTextInput
                                    leftIcon={<User/>}
                                    label={lang.email}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    style={{marginTop: ResponsiveUtil.height(40)}}
                                    error={errors['email']}
                                />
                            )}
                            name="email"
                            defaultValue="john.doe@example.com"

                        />
                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <CommonTextInput
                                    leftIcon={<Locker/>} label={lang.password}
                                    rightIcon={<Eye/>}
                                    style={{marginTop: ResponsiveUtil.height(40)}}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    error={errors['password']}
                                    secureTextEntry={secureTextEntry}
                                    onRightIconClick={() => {
                                        setSecureTextEntry(!secureTextEntry);
                                    }}
                                />
                            )}
                            name="password"
                            defaultValue="123456"
                        />
                    </View>
                    <CommonButton label={lang.signIn.toUpperCase()} style={{marginTop: ResponsiveUtil.height(36)}}
                        onPress={handleSubmit(onSubmit)}
                    />
                    <CommonText style={{
                        textAlign: 'center',
                        color: '#6a6a6a',
                        marginTop: ResponsiveUtil.height(16),
                        fontWeight: '100',
                        fontSize: ResponsiveUtil.font(13),
                    }}>{lang.dontHaveAnAccount} <CommonText onPress={() => {
                        navigation.navigate('SignUpWithPasswordScreen');
                    }}>{lang.signUp}</CommonText></CommonText>
                    <CommonButton
                        label={lang.connectWithFacebook}
                        labelStyle={{color: 'white'}}
                        style={{backgroundColor: ColorUtil.blue, marginTop: ResponsiveUtil.height(20)}}
                        leftIcon={<FacebookIcon/>}
                        leftIconStyle={{top: ResponsiveUtil.height(12)}}
                        onPress={signInWithFacebook}
                    />
                    <CommonButton
                        label={lang.connectWithGoogle}
                        style={{backgroundColor: ColorUtil.google, marginTop: ResponsiveUtil.height(20)}}
                        leftIcon={<Google/>}
                        leftIconStyle={{top: ResponsiveUtil.height(12)}}
                        onPress={signInWithGoogle}
                    />
                    <CommonButton
                        label={lang.sms}
                        style={{backgroundColor: ColorUtil.sms, marginTop: ResponsiveUtil.height(20)}}
                        leftIcon={<MessageBox/>}
                        leftIconStyle={{top: ResponsiveUtil.height(12)}}
                        onPress={() => {
                            navigation.navigate('SignUpWithPhoneNumberScreen');
                        }}
                    />
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
    body: {
        paddingLeft: ResponsiveUtil.width(25),
        paddingRight: ResponsiveUtil.width(25),
    },
    topBar: {
        height: ResponsiveUtil.height(100 - getStatusBarHeight()),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topBarLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    topBarRight: {
        justifyContent: 'center',
    },
    content: {
        marginTop: ResponsiveUtil.height(40),
        height: ResponsiveUtil.height(672),

    },
    title: {
        height: ResponsiveUtil.height(64),
        width: '100%',
    },
    form: {
        height: ResponsiveUtil.height2(268,200),
        width: '100%',
        marginTop: ResponsiveUtil.height(20),
    },
    agreement: {
        height: ResponsiveUtil.height(40),
        width: '100%',
        marginTop: ResponsiveUtil.height(32),
        flexDirection: 'row',
    },
    agreementText: {
        height: ResponsiveUtil.height(40),
        width: ResponsiveUtil.width(273),
    },
    signUpButton: {},

});

