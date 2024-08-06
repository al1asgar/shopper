import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import React from 'react';
import Animated from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import AuthenticationNavigator from './AuthenticationNavigator';
import BottomTabBarNavigator from './BottomTabBarNavigator';
import ProductDetailScreen from '../../screen/product/ProductDetailScreen';
import AddressScreen from '../../screen/address/AddressScreen';
import AddAddressScreen from '../../screen/address/AddAddressScreen';
import UpdateAddressScreen from '../../screen/address/UpdateAddressScreen';
import PaymentScreen from '../../screen/payment/PaymentScreen';
import OrderReviewScreen from '../../screen/order/OrderReviewScreen';
import CardScreen from '../../screen/card/CardScreen';
import AddCardScreen from '../../screen/card/AddCardScreen';
import UpdateCardScreen from '../../screen/card/UpdateCardScreen';
import OrderCompleteScreen from '../../screen/order/OrderCompleteScreen';
import OrderHistoryDetailScreen from '../../screen/order/OrderHistoryDetailScreen';
import SettingScreen from '../../screen/setting/SettingScreen';
import OrderHistoryScreen from '../../screen/order/OrderHistoryScreen';
import ChatScreen from '../../screen/chat/ChatScreen';
import ContactScreen from '../../screen/chat/ContactScreen';
import WishListScreen from '../../screen/wishlist/WishListScreen';
import UpdateUserInformationScreen from '../../screen/user/UpdateUserInformationScreen';

const UserStack = createStackNavigator();

function UserStackNavigator({style}) {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <UserStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <UserStack.Screen
          name="BottomTabBarNavigator"
          component={BottomTabBarNavigator}
        />
        <UserStack.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
        />
        <UserStack.Screen name="AddressScreen" component={AddressScreen} />
        <UserStack.Screen
          name="AddAddressScreen"
          component={AddAddressScreen}
        />
        <UserStack.Screen
          name="UpdateAddressScreen"
          component={UpdateAddressScreen}
        />
        <UserStack.Screen
          name="OrderReviewScreen"
          component={OrderReviewScreen}
        />
        <UserStack.Screen name="PaymentScreen" component={PaymentScreen} />
        <UserStack.Screen name="CardScreen" component={CardScreen} />
        <UserStack.Screen name="AddCardScreen" component={AddCardScreen} />
        <UserStack.Screen
          name="UpdateCardScreen"
          component={UpdateCardScreen}
        />
        <UserStack.Screen
          name="OrderCompleteScreen"
          component={OrderCompleteScreen}
        />
        <UserStack.Screen
          name="OrderHistoryScreen"
          component={OrderHistoryScreen}
        />
        <UserStack.Screen
          name="OrderHistoryDetailScreen"
          component={OrderHistoryDetailScreen}
        />
        <UserStack.Screen name="SettingScreen" component={SettingScreen} />
        <UserStack.Screen name="ChatScreen" component={ChatScreen} />
        <UserStack.Screen name="ContactScreen" component={ContactScreen} />
        <UserStack.Screen name="WishListScreen" component={WishListScreen} />
        <UserStack.Screen
          name="UpdateUserInformationScreen"
          component={UpdateUserInformationScreen}
        />
      </UserStack.Navigator>
    </Animated.View>
  );
}

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
});
export default UserStackNavigator;
