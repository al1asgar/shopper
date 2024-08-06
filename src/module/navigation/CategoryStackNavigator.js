import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import Animated from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import CategoryScreen from '../../screen/category/CategoryScreen';
import SubCategoryScreen from '../../screen/category/SubCategoryScreen';
import ProductByCategoryScreen from '../../screen/category/ProductByCategoryScreen';

const Stack = createStackNavigator();

function CategoryStackNavigator() {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack])}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
        <Stack.Screen name="SubCategoryScreen" component={SubCategoryScreen} />
        <Stack.Screen
          name="ProductByCategoryScreen"
          component={ProductByCategoryScreen}
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
    // overflow: 'scroll',
    // borderWidth: 1,
  },
});
export default CategoryStackNavigator;
