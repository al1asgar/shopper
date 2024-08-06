import React, {useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import GuestStackNavigator from './GuestStackNavigator';
import Animated from 'react-native-reanimated';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';
import CommonText from '../../component/common/CommonText';
import {UserAction} from '../../persistence/user/UserAction';
import Logout from '../../component/icon/Logout';
import CommonLine from '../../component/common/CommonLine';
import FastImage from 'react-native-fast-image';
import CommonCountryPicker from '../../component/common/CommonCountryPicker';
import Setting from '../../component/icon/Setting';
import User2 from '../../component/icon/User2';
import Search2 from '../../component/icon/Search2';
import Category from '../../component/icon/Category';
import UserStackNavigator from './UserStackNavigator';

const Drawer = createDrawerNavigator();
const DrawerContent = ({navigation}) => {
  const user = useSelector(state => state.UserReducer.data);
  const lang = useSelector(state => state.LanguageReducer.language);
  const [visibleLanguage, setVisibleLanguage] = useState(false);
  const dispatch = useDispatch();
  const signOut = (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.item}
      onPress={() => {
        dispatch(UserAction.signOut());
      }}>
      <View style={styles.leftIcon}>
        <Logout />
      </View>
      <View style={styles.content}>
        <CommonText style={styles.text}>{lang.signOut}</CommonText>
      </View>
      <View style={styles.rightIcon}></View>
    </TouchableOpacity>
  );
  const signIn = (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.item}
      onPress={() => {
        navigation.navigate('SignInScreen');
      }}>
      <View style={styles.leftIcon}>
        <User2 />
      </View>
      <View style={styles.content}>
        <CommonText style={styles.text}>{lang.signIn}</CommonText>
      </View>
      <View style={styles.rightIcon}></View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View style={[styles.header, {marginTop: ResponsiveUtil.height2(0, 0)}]}>
        <FastImage
          style={styles.header}
          source={require('../../../assets/zara_logo.png')}
          resizeMode={FastImage.resizeMode.stretch}
        />
      </View>
      <ScrollView
        style={styles.userInformation}
        showsVerticalScrollIndicator={false}>
        {user.loggedIn ? <></> : signIn}
        <CommonLine style={{marginTop: ResponsiveUtil.height(2)}} />
        {user.loggedIn && (
            <CommonLine style={{marginTop: ResponsiveUtil.height(2)}} />
          ) && (
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.item}
              onPress={() => {
                navigation.navigate('UpdateUserInformationScreen');
              }}>
              <View style={styles.leftIcon}>
                <User2 />
              </View>
              <View style={styles.content}>
                <CommonText style={styles.text}>
                  {user.loggedIn ? user.user.email : 'youremail@example.com'}
                </CommonText>
              </View>
              <View
                style={[
                  styles.rightIcon,
                  {width: ResponsiveUtil.width(48)},
                ]}></View>
            </TouchableOpacity>
          )}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.item}
          onPress={() => {
            navigation.navigate('CategoryStackNavigator');
          }}>
          <View style={styles.leftIcon}>
            <Category />
          </View>
          <View style={styles.content}>
            <CommonText style={styles.text}>{lang.categories}</CommonText>
          </View>
          <View
            style={[
              styles.rightIcon,
              {width: ResponsiveUtil.width(48)},
            ]}></View>
        </TouchableOpacity>
        <CommonLine style={{marginTop: ResponsiveUtil.height(2)}} />
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.item}
          onPress={() => {
            navigation.navigate('SearchScreen');
          }}>
          <View style={styles.leftIcon}>
            <Search2 />
          </View>
          <View style={styles.content}>
            <CommonText style={styles.text}>{lang.search}</CommonText>
          </View>
          <View style={styles.rightIcon}></View>
        </TouchableOpacity>

        <CommonLine style={{marginTop: ResponsiveUtil.height(2)}} />
        {user.loggedIn && (
            <CommonLine style={{marginTop: ResponsiveUtil.height(2)}} />
          ) && (
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.item}
              onPress={() => {
                navigation.navigate('SettingScreen');
              }}>
              <View style={styles.leftIcon}>
                <Setting />
              </View>
              <View style={styles.content}>
                <CommonText style={styles.text}>{lang.setting}</CommonText>
              </View>
              <View style={styles.rightIcon}></View>
            </TouchableOpacity>
          )}
        {user.loggedIn ? signOut : <></>}
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.item}
        onPress={() => {}}>
        <View style={styles.leftIcon}></View>
        <View style={styles.content}>
          <CommonText style={styles.text}>Copyright © 2021 LM</CommonText>
        </View>
        <View style={styles.rightIcon}>
          <CommonCountryPicker
            visible={visibleLanguage}
            setVisible={setVisibleLanguage}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    // overflow: 'scroll',
    // borderWidth: 1,
  },
  text: {fontSize: ResponsiveUtil.width(12), fontWeight: '400'},
  drawerStyles: {flex: 1, width: '60%', backgroundColor: 'transparent'},
  header: {
    height: ResponsiveUtil.height(80),
    width: '100%',
  },
  userInformation: {
    marginTop: ResponsiveUtil.height(6),
    width: '100%',
    maxHeight: ResponsiveUtil.screenHeight() - 110,
  },
  item: {
    width: '100%',
    height: ResponsiveUtil.height(40),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ResponsiveUtil.height(8),
  },
  leftIcon: {
    width: ResponsiveUtil.width(42),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcon: {
    width: ResponsiveUtil.width(30),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  setting: {
    height: ResponsiveUtil.height(40),
    width: '100%',
  },
});

export default function DrawerNavigator() {
  const [progress, setProgress] = useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });
  const animatedStyle = {borderRadius, transform: [{scale: scale}]};
  const loggedIn = useSelector(state => state.UserReducer.data.loggedIn);
  return (
    <Drawer.Navigator
      initialRouteName="Showing"
      drawerType="slide"
      overlayColor="transparent"
      drawerStyle={styles.drawerStyles}
      contentContainerStyle={{flex: 1}}
      drawerContentOptions={{
        activeBackgroundColor: 'transparent',
        activeTintColor: 'white',
        inactiveTintColor: 'white',
      }}
      sceneContainerStyle={{backgroundColor: 'transparent'}}
      drawerContent={props => {
        setProgress(props.progress);
        return <DrawerContent {...props} />;
      }}>
      <Drawer.Screen name="ZaraScreens">
        {props => {
          if (loggedIn) {
            return <UserStackNavigator {...props} style={animatedStyle} />;
          } else {
            return <GuestStackNavigator {...props} style={animatedStyle} />;
          }
        }}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
