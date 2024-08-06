import * as React from 'react';
import { StyleSheet, View, Text, TextInput, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from "./DrawerNavigator";
import {useEffect} from "react";
import {useDispatch} from 'react-redux';
import {CommonAction} from "../../persistence/common/CommonAction";
import {LanguageService} from "../../persistence/language/LanguageService";
import {LanguageAction} from "../../persistence/language/LanguageAction";
import OneSignal from 'react-native-onesignal';
import {ApplicationProperties} from "../../application.properties";

function ApplicationNavigator() {
    const dispatch = useDispatch();
    const oneSignalInitialization = async () => {
        /* O N E S I G N A L   S E T U P */
        OneSignal.setAppId(ApplicationProperties.oneSignalId);
        OneSignal.setLogLevel(6, 0);
        OneSignal.setRequiresUserPrivacyConsent(false);
        OneSignal.promptForPushNotificationsWithUserResponse(response => {
            console.log("Prompt response:", response);
        });

        /* O N E S I G N A L  H A N D L E R S */
        OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
            let notif = notifReceivedEvent.getNotification();

            const button1 = {
                text: "Cancel",
                onPress: () => {
                    notifReceivedEvent.complete();
                },
                style: "cancel"
            };

            const button2 = {
                text: "Complete", onPress: () => {
                    notifReceivedEvent.complete(notif);
                }
            };

            Alert.alert("Complete notification?", "Test", [button1, button2], {cancelable: true});
        });
        OneSignal.setNotificationOpenedHandler(notification => {
            console.log("OneSignal: notification opened:", notification);
        });
        OneSignal.setInAppMessageClickHandler(event => {
            console.log("OneSignal IAM clicked:", event);
        });
        OneSignal.addEmailSubscriptionObserver((event) => {
            console.log("OneSignal: email subscription changed: ", event);
        });
        OneSignal.addSubscriptionObserver(event => {
            console.log("OneSignal: subscription changed:", event);
        });
        OneSignal.addPermissionObserver(event => {
            console.log("OneSignal: permission changed:", event);
        });
        const deviceState = await OneSignal.getDeviceState();
    }
    useEffect(()=>{
        oneSignalInitialization();
        dispatch(CommonAction.getAllColors('products/attributes/2/terms', {featxured: false}));
        dispatch(CommonAction.getAllSizes('products/attributes/1/terms', {featxured: false}));
        dispatch(CommonAction.getAllSettings('settings/general', {featxured: false}));
        dispatch(CommonAction.getCurrentCurrency('data/currencies/current', {featxured: false}));
        dispatch(CommonAction.getAllSupporters('customers', {role: 'editor'}));
        LanguageService.getLanguage().then(data => {
            dispatch(LanguageAction.change(data));
        });
    },[]);
    return (
        <NavigationContainer>
            <DrawerNavigator/>
        </NavigationContainer>
    );
}

export default ApplicationNavigator;
