import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';
import {useSelector} from 'react-redux';
import Home from '../../component/icon/Home';
import Search from '../../component/icon/Search';
import Cart from '../../component/icon/Cart';
import Category from '../../component/icon/Category';
import MainScreen from '../../screen/main/MainScreen';
import CategoryStackNavigator from './CategoryStackNavigator';
import CartScreen from '../../screen/cart/CartScreen';
import SearchScreen from '../../screen/search/SearchScreen';
import MainStackNavigator from './MainStackNavigator';


function MyTabBar({state, descriptors, navigation}) {

    const focusedOptions = descriptors[state.routes[state.index].key].options;
    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.menuContainer}>
                {state.routes.map((route, index) => {
                    const {options} = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                            ? options.title
                            : route.name;

                    const isFocused = state.index === index;
                    const menuIcon = options.tabBarIcon(isFocused);
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };
                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? {selected: true} : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={[styles.menuItem, {justifyContent: 'center'}]}
                            key={route.key}
                        >
                            {menuIcon}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function BottomTabBarNavigator() {
    const lang = useSelector(state => state.LanguageReducer.language);
    const cart = useSelector(state => state.CartReducer.data);
    return (
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen name="MainStackNavigator" component={MainStackNavigator} options={{
                tabBarIcon: (focused) => (
                    <Home focused={focused}/>
                ),
                tabBarLabel: lang.home,
            }}/>
            <Tab.Screen name="CategoryStackNavigator" component={CategoryStackNavigator} options={{
                tabBarIcon: (focused) => (
                    <Category focused={focused}/>
                ),
                tabBarLabel: lang.category,
            }}/>
            <Tab.Screen name="SearchScreen" component={SearchScreen} options={{
                tabBarIcon: (focused) => (
                    <Search focused={focused}/>
                ),
                tabBarLabel: lang.search,
            }}/>
            <Tab.Screen name="CartScreen" component={CartScreen} options={{
                tabBarIcon: (focused) => (
                    <Cart focused={focused} quantity={cart.itemCount}/>
                ),
                tabBarLabel: lang.cart,
            }}/>


        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    container: {
        height: ResponsiveUtil.height(60),
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    menuContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingLeft: ResponsiveUtil.width(23),
        paddingRight: ResponsiveUtil.width(23),
        height: ResponsiveUtil.height(60),
        alignItems: 'center',
    },
    menuItem: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        height: ResponsiveUtil.height(40),
        flexDirection: 'row',
        borderRadius: ResponsiveUtil.width(30),
        paddingLeft: ResponsiveUtil.width(8),
        paddingRight: ResponsiveUtil.width(8),
    },
    menuIcon: {
        width: ResponsiveUtil.width(24),
        height: ResponsiveUtil.height(24),
    },
    cartContainer: {
        height: ResponsiveUtil.height(56),
        width: ResponsiveUtil.width(116),
        position: 'absolute',
        top: ResponsiveUtil.height(0),
        right: 0,
    },
});
