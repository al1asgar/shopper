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

const GuestStack = createStackNavigator();

function GuestStackNavigator({style}) {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <GuestStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <GuestStack.Screen
          name="AuthenticationNavigator"
          component={AuthenticationNavigator}
        />
        <GuestStack.Screen
          name="BottomTabBarNavigator"
          component={BottomTabBarNavigator}
        />
        <GuestStack.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
        />
      </GuestStack.Navigator>
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
  },
});
export default GuestStackNavigator;
