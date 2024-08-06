/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-reanimated';
import React from 'react';
import {Provider} from 'react-redux';
import ApplicationNavigator from './src/module/navigation/ApplicationNavigator';
import stripe from '@agaweb/react-native-stripe';
import RootStore from './src/persistence/store/RootStore';
import {ApplicationProperties} from './src/application.properties';
import {enableScreens} from 'react-native-screens';
import {LogBox, StatusBar} from 'react-native';
import CommonLoading from './src/component/common/CommonLoading';
import Toast from 'react-native-toast-message';
import {firebase} from '@react-native-firebase/auth';

stripe.initModule(ApplicationProperties.stripePublishingKey);
enableScreens();
LogBox.ignoreLogs(['Warning: Cannot']);
LogBox.ignoreLogs(['component']);
LogBox.ignoreLogs(['Clipboard']);
LogBox.ignoreLogs(['RCTUI']);
LogBox.ignoreLogs(['[auth/p']);
LogBox.ignoreLogs(['[User cancelled the login process']);

export default function App() {
  firebase.auth().settings.appVerificationDisabledForTesting =
    ApplicationProperties.appVerificationDisabledForTesting;
  return (
    <Provider store={RootStore}>
      <StatusBar
        hidden={false}
        backgroundColor={'white'}
        barStyle={'dark-content'}
      />
      <ApplicationNavigator />
      <CommonLoading ref={ref => CommonLoading.setRef(ref)} />
      <Toast ref={ref => Toast.setRef(ref)} />
    </Provider>
  );
}
