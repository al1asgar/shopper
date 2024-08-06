import * as React from 'react';
import {Image, StyleSheet, Text, View,} from 'react-native';
import {ResponsiveUtil} from "../../util/ResponsiveUtil";
import Swiper from 'react-native-swiper'
import CommonButton from "../../component/common/CommonButton";
import {useSelector} from 'react-redux';

export default function IntroScreen({navigation}) {

    const lang = useSelector(state => state.LanguageReducer.language);
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Text style={styles.logoText}>ZARA</Text>
            </View>
            <View style={styles.slider}>
                <Swiper showsButtons={false}>
                    <View style={styles.image}>
                        <Image source={require('../../../assets/intro01.png')} resizeMode={'stretch'} style={{
                            height: '100%',
                            width: '100%'
                        }}/>
                        <View style={styles.blurBackground}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>Discover the latest womenswear</Text>
                            </View>
                            <Image source={require('../../../assets/blur_white_background.png')} style={{
                                height: '100%',
                                width: '100%'
                            }}/>
                        </View>
                    </View>
                    <View style={styles.image}>
                        <Image source={require('../../../assets/intro02.png')} resizeMode={'stretch'} style={{
                            height: '100%',
                            width: '100%'
                        }}/>
                        <View style={styles.blurBackground}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>Wear clothes that matter</Text>
                            </View>
                            <Image source={require('../../../assets/blur_white_background.png')} style={{
                                height: '100%',
                                width: '100%'
                            }}/>
                        </View>
                    </View>
                    <View style={styles.image}>
                        <Image source={require('../../../assets/intro03.png')} resizeMode={'stretch'} style={{
                            height: '100%',
                            width: '100%'
                        }}/>
                        <View style={styles.blurBackground}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>A girl should be two things: classy and fabulous</Text>
                            </View>
                            <Image source={require('../../../assets/blur_white_background.png')} style={{
                                height: '100%',
                                width: '100%'
                            }}/>
                        </View>
                    </View>
                </Swiper>
            </View>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <CommonButton label={lang.continueAsGuest} labelStyle={{color: 'black'}} style={{backgroundColor: 'white'}} onPress={() => {
                        navigation.navigate('BottomTabBarNavigator');
                    }}/>
                </View>
                <View style={styles.button}>
                    <CommonButton label={lang.signIn} labelStyle={{color: 'white'}} onPress={() => {
                        navigation.navigate('SignInScreen');
                    }}/>
                </View>
                <View style={styles.button}>
                    <CommonButton label={lang.createAnAccount} labelStyle={{color: 'white'}} onPress={() => {
                        navigation.navigate('SignUpWithPasswordScreen');
                    }}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    slider: {
        width: ResponsiveUtil.width(375),
        height: ResponsiveUtil.height(630) - ResponsiveUtil.statusBarHeight(),
    },
    blurBackground: {
        width: '100%',
        height: ResponsiveUtil.width(549),
        position: 'absolute',
        bottom: ResponsiveUtil.height(0),
    },
    whiteBackground: {
        width: '100%',
        height: '100%'
    },
    image: {
        width: ResponsiveUtil.width(375),
        height: ResponsiveUtil.height(630),
    },
    logo: {
        width: ResponsiveUtil.screenWidth(),
        height: ResponsiveUtil.height(26),
        position: 'absolute',
        top: ResponsiveUtil.statusBarHeight(),
        zIndex: 9999,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoText: {
        fontSize: ResponsiveUtil.font(30),
        fontWeight: 'bold'
    },
    buttons: {
        flex: 1,
        paddingLeft: ResponsiveUtil.width(23),
        paddingRight: ResponsiveUtil.width(23),
    },
    button: {
        width: '100%',
        height: ResponsiveUtil.height(48),
        marginTop: ResponsiveUtil.height(15)
    },
    title: {
        width: '100%',
        height: ResponsiveUtil.height(72),
        position: 'absolute',
        bottom: ResponsiveUtil.height(55),
        zIndex: 10000,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: ResponsiveUtil.width(30),
        paddingRight: ResponsiveUtil.width(30),
    },
    titleText: {
        fontSize: ResponsiveUtil.font(26),
        lineHeight: ResponsiveUtil.height(36),
        fontWeight: '700',
        textAlign: 'center'
    }
});
