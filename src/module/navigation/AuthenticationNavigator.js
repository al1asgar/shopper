import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import IntroScreen from "../../screen/authentication/IntroScreen";
import SignInScreen from "../../screen/authentication/SignInScreen";
import SignUpWithPasswordScreen from "../../screen/authentication/SignUpWithPasswordScreen";
import SignUpWithPhoneNumberScreen from "../../screen/authentication/SignUpWithPhoneNumberScreen";

const Stack = createStackNavigator();

function AuthenticationNavigator() {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <Stack.Screen name="IntroScreen" component={IntroScreen}/>
            <Stack.Screen name="SignInScreen" component={SignInScreen}/>
            <Stack.Screen name="SignUpWithPasswordScreen" options={{title: 'Email'}} component={SignUpWithPasswordScreen}/>
            <Stack.Screen name="SignUpWithPhoneNumberScreen" options={{title: 'SMS'}} component={SignUpWithPhoneNumberScreen}/>
        </Stack.Navigator>
    );
}

export default AuthenticationNavigator;
