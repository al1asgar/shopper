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
import User from "../../component/icon/User";
import Locker from "../../component/icon/Locker";
import Eye from "../../component/icon/Eye";
import {getStatusBarHeight} from "react-native-status-bar-height";
import {UserAction} from "../../persistence/user/UserAction";
import {ResponsiveUtil} from "../../util/ResponsiveUtil";
import Mail from "../../component/icon/Mail";
import CommonCheckbox from "../../component/common/CommonCheckbox";
import Back from "../../component/icon/Back";
import CommonLoading from '../../component/common/CommonLoading';
import CommonToast from '../../component/common/CommonToast';

export default function SignUpWithPasswordScreen({navigation,route}) {
    let screenName = null;
    if(route.params){
        screenName = route.params.screenName;
    }
    const dispatch = useDispatch();
    const lang = useSelector(state => state.LanguageReducer.language);
    const schema = yup.object().shape({
        email: yup.string().required(lang.email + ' ' + lang.isARequiredField),
        username: yup.string().required(lang.username + ' ' + lang.isARequiredField),
        password: yup.string().required(lang.password + ' ' + lang.isARequiredField),
        acceptTerms: yup.bool().oneOf([true], lang.termAndConditions + ' ' + lang.isARequiredField),
    });
    const {control, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = data => {
        CommonLoading.show();
        dispatch(UserAction.signUp('customers', data)).then((response) => {
            if(response.success){
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
    };
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
                        }}>{lang.gettingStarted}</CommonText>
                        <CommonText style={{
                            fontSize: ResponsiveUtil.font(14),
                            color: '#6a6a6a',
                            lineHeight: ResponsiveUtil.height(24),
                        }}>{lang.createAnAccountToContinue}</CommonText>
                    </View>
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
                                />
                            )}
                            name="email"
                            defaultValue=""

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
                                    style={{marginTop: ResponsiveUtil.height(40)}}
                                    error={errors['username']}
                                />
                            )}
                            name="username"
                            defaultValue=""

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
                                    style={{marginTop: ResponsiveUtil.height(40)}}
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
                    <View style={styles.agreement}>
                        <Controller
                            control={control}
                            render={({onChange, onBlur, value}) => (
                                <CommonCheckbox
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    value={value}
                                />
                            )}
                            name="acceptTerms"
                            defaultValue={false}
                        />

                        <View style={styles.agreementText}>
                            <CommonText style={{
                                fontSize: ResponsiveUtil.font(12),
                                lineHeight: ResponsiveUtil.height(20),
                            }}>{lang.byCreatingAnAccountYouAgreeToOur}</CommonText>
                            <CommonText>{lang.termAndConditions}</CommonText>
                        </View>
                    </View>
                    <CommonButton label={lang.signUp.toUpperCase()} style={{marginTop: ResponsiveUtil.height(36)}}
                        onPress={handleSubmit(onSubmit)}
                    />
                    <CommonText style={{
                        textAlign: 'center',
                        color: '#6a6a6a',
                        marginTop: ResponsiveUtil.height(16),
                        fontWeight: '100',
                        fontSize: ResponsiveUtil.font(13),
                    }}>{lang.alreadyHaveAnAccount} <CommonText onPress={() => {
                        navigation.navigate('SignInScreen');
                    }}>{lang.signIn}</CommonText></CommonText>
                </View>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    body: {
        flex: 1,
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
        height: ResponsiveUtil.height(268),
        width: '100%',
        marginTop: ResponsiveUtil.height(40),
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


