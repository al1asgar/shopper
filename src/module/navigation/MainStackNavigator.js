import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import Animated from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import MainScreen from '../../screen/main/MainScreen';
import ProductByDiscountScreen from '../../screen/main/ProductByDiscountScreen';

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack])}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen
          name="ProductByDiscountScreen"
          component={ProductByDiscountScreen}
        />
      </Stack.Navigator>
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
export default MainStackNavigator;
