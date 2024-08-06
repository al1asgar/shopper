import React from 'react';
import {StyleSheet, View} from 'react-native';
import Content from './Content';
import Animated from 'react-native-reanimated';
import {onScrollEvent, useValues} from 'react-native-redash';
// import {onScrollEvent, useValues} from 'react-native-redash/lib/module/v1';
import HeaderImage from './HeaderImage';
import Header from './Header';
import {useSelector} from 'react-redux';

export default function SettingScreen({route, navigation}) {
  const lang = useSelector(state => state.LanguageReducer.language);
  const [y] = useValues([0], []);
  return (
    <View style={styles.container}>
      <Header y={y} item={{name: lang.setting}} />
      <HeaderImage y={y} />
      <Animated.ScrollView
        style={StyleSheet.absoluteFill}
        scrollEventThrottle={1}
        onScroll={onScrollEvent({y})}
        overScrollMode={'auto'}
        showsVerticalScrollIndicator={false}>
        <Content />
      </Animated.ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
