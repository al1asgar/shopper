import * as React from 'react';
import {useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CommonText from '../../component/common/CommonText';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';
import CommonButton from '../../component/common/CommonButton';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useDispatch, useSelector} from 'react-redux';
import PhoneInput from 'react-native-phone-number-input';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Back from '../../component/icon/Back';
import auth from '@react-native-firebase/auth';
import {UserAction} from '../../persistence/user/UserAction';
import CommonLoading from '../../component/common/CommonLoading';
import CommonToast from '../../component/common/CommonToast';
import {ApplicationProperties} from '../../application.properties';

export default function SignUpWithPhoneNumberScreen({navigation, route}) {
    let screenName = null;
    if (route.params) {
        screenName = route.params.screenName;
    }
    const dispatch = useDispatch();
    const lang = useSelector(state => state.LanguageReducer.language);
    const verificationCodeTextInput = React.useRef(null);
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [verificationId, setVerificationId] = React.useState('');
    const [verifyError, setVerifyError] = React.useState();
    const [verifyInProgress, setVerifyInProgress] = React.useState(false);
    const [verificationCode, setVerificationCode] = React.useState('');
    const [confirmError, setConfirmError] = React.useState();
    const [confirmInProgress, setConfirmInProgress] = React.useState(false);
    const [value, setValue] = useState('');
    const isLoggedIn = useSelector(state => state.UserReducer.data.loggedIn);
    const [confirm, setConfirm] = useState(null);
    const verifyPhoneNumber = () => {
        auth().verifyPhoneNumber(phoneNumber,false)
            .on('state_changed', (phoneAuthSnapshot) => {
                switch (phoneAuthSnapshot.state) {
                    case auth.PhoneAuthState.CODE_SENT:
                        setConfirm(phoneAuthSnapshot);
                        setVerifyError(undefined);
                        setVerifyInProgress(true);
                        setVerificationId('');
                        setVerifyInProgress(false);
                        setVerificationId(verificationId);
                        verificationCodeTextInput.current?.focus();
                        CommonLoading.hide();
                        break;

                    case auth.PhoneAuthState.ERROR:
                        setVerifyError('error');
                        setVerifyInProgress(false);
                        CommonLoading.hide();
                        break;

                    case auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT:
                        setVerifyError('error');
                        setVerifyInProgress(false);
                        CommonLoading.hide();
                        break;

                    case auth.PhoneAuthState.AUTO_VERIFIED:
                        onCodeFilled(null,phoneAuthSnapshot);
                        break;
                }

            })
            .then(phoneAuthSnapshot => {
                console.log(phoneAuthSnapshot.state)

            },error => {
                console.log(error);
            });
    };
    const onCodeFilled = async (code,phoneAuthSnapshot) => {
        try {
            setConfirmError(undefined);
            setConfirmInProgress(true);
            let credential;
            if(phoneAuthSnapshot){
                credential = auth.PhoneAuthProvider.credential(phoneAuthSnapshot.verificationId, phoneAuthSnapshot.code);
            }
            else{
                credential = auth.PhoneAuthProvider.credential(confirm.verificationId, code);
            }
            const authResult = await auth().signInWithCredential(credential);
            setConfirmInProgress(false);
            setVerificationId('');
            setVerificationCode('');
            verificationCodeTextInput.current?.clear();
            CommonLoading.show();
            dispatch(UserAction.signInWithPhoneNumber({
                success: true,
                data: authResult,
            })).then(response => {
                if (response.success) {
                    const {isNewUser} = response.data.additionalUserInfo;
                    const realPhoneNumber = phoneNumber.replace('+', '');
                    if (!isNewUser) {
                        dispatch(UserAction.signIn('customers', {
                            email: realPhoneNumber + ApplicationProperties.emailDomain,
                            password: realPhoneNumber + ApplicationProperties.emailDomain,
                        })).then(data => {
                            if (!data.success) {
                                CommonToast.error({
                                    message: lang.sorryOurSystem,
                                });
                                navigation.goBack();
                            } else {
                                if (screenName) {
                                    navigation.goBack();
                                } else {
                                    CommonLoading.hide();
                                    navigation.navigate('BottomTabBarNavigator');
                                }
                            }
                            CommonLoading.hide();
                        });
                    } else {
                        const newUser = {
                            email: realPhoneNumber + ApplicationProperties.emailDomain,
                            username: realPhoneNumber,
                            password : realPhoneNumber + ApplicationProperties.emailDomain,
                            first_name: '',
                            last_name: '',
                        };
                        dispatch(UserAction.signUp('customers', newUser)).then(data => {
                            if (data.success) {
                                if (screenName) {
                                    navigation.goBack();
                                } else {
                                    CommonLoading.hide();
                                    navigation.navigate('BottomTabBarNavigator');
                                }
                            } else {
                                CommonToast.error({
                                    message: lang.sorryOurSystem,
                                });
                            }
                            CommonLoading.hide();
                        });

                    }
                } else {
                    CommonToast.error({
                        message: lang.invalidCredential,
                    });
                    CommonLoading.hide();

                }
            });
        } catch (err) {
            setConfirmError(err);
            setConfirmInProgress(false);
            dispatch(UserAction.signInWithPhoneNumber({
                success: false,
            }));
            CommonLoading.hide();
        }

    }
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
                        }}>{lang.enterYourPhoneNumber}</CommonText>
                    </View>
                    <View style={styles.form}>
                        <PhoneInput
                            defaultValue={value}
                            defaultCode="VN"
                            layout="first"
                            onChangeText={(text) => {
                                setValue(text);
                            }}
                            onChangeFormattedText={(text) => {
                                setPhoneNumber(text);
                            }}
                            keyboardType="phone-pad"
                            autoCompleteType="tel"
                            containerStyle={{
                                backgroundColor: '#fff',
                                borderBottomWidth: ResponsiveUtil.width(0.5),
                                borderBottomColor: '#6a6a6a',
                                width: '100%',
                            }}
                            disabled={verificationId == '' ? false : true}
                            disableArrowIcon={verificationId == '' ? false : true}
                            textContainerStyle={{
                                backgroundColor: '#fff',
                            }}
                        />
                        <View style={{width: '100%'}}>
                            {verifyError && <Text style={styles.error}>{lang.yourPhoneNumberIsInValid}</Text>}
                            {verifyInProgress && <ActivityIndicator style={styles.loader}/>}
                            {verificationId ? (
                                <Text style={styles.success}>{lang.aVerificationCodeHasBeenSentToYourPhone}</Text>
                            ) : (
                                undefined
                            )}
                        </View>
                        <CommonButton
                            disabled={phoneNumber == '' ? true : false}
                            label={`${verificationId ? lang.resend : lang.send} ${lang.verificationCode}`}
                            style={{marginTop: ResponsiveUtil.height(36)}}
                            onPress={async () => {
                                try {
                                    CommonLoading.show();
                                    verifyPhoneNumber();
                                    CommonLoading.hide();
                                } catch (err) {
                                    setVerifyError(err);
                                    setVerifyInProgress(false);
                                    CommonLoading.hide();
                                }
                            }}
                        />
                        {
                            confirm
                            &&
                            <View style={{width: '100%', marginTop: ResponsiveUtil.height(30)}}>
                                <CommonText style={{
                                    fontSize: ResponsiveUtil.font(14),
                                    color: '#6a6a6a',
                                    lineHeight: ResponsiveUtil.height(24),
                                }}>{lang.enterOTPCode}</CommonText>
                            </View>
                        }
                        {
                            confirm
                            && <OTPInputView
                                style={{width: '100%', height: 50}}
                                pinCount={6}
                                onCodeChanged={code => {
                                    setVerificationCode(code);
                                }}
                                codeInputFieldStyle={styles.underlineStyleBase}
                                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                onCodeFilled={async (code) => {
                                    await onCodeFilled(code, null);
                                }}
                            />
                        }

                        <View style={{width: '100%'}}>
                            {confirmError && <Text style={styles.error}>{`${confirmError}`}</Text>}
                            {confirmInProgress && <ActivityIndicator style={styles.loader}/>}
                        </View>

                        <CommonText style={{
                            textAlign: 'center',
                            color: '#6a6a6a',
                            marginTop: ResponsiveUtil.height(16),
                            fontWeight: '100',
                            fontSize: ResponsiveUtil.font(13),
                        }}>Time flies when you are having <CommonText onPress={() => {
                            navigation.navigate('SignInScreen');
                        }}>Fun</CommonText></CommonText>
                    </View>


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
        alignItems: 'center',
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
    borderStyleBase: {
        width: 30,
        height: 45,
    },

    borderStyleHighLighted: {
        borderColor: '#03DAC6',
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#000000',
        color: 'black',
    },

    underlineStyleHighLighted: {
        borderColor: '#000000',
    },
    error: {
        marginTop: 10,
        fontWeight: 'bold',
        color: 'red',
    },
    success: {
        marginTop: 10,
        fontWeight: 'bold',
        color: 'black',
    },
    loader: {
        marginTop: 10,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#FFFFFFC0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayText: {
        fontWeight: 'bold',
    },
});
