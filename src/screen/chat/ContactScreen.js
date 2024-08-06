import React, {useEffect, useState} from 'react';
import {Animated, SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import MessageItem from './MessageItem';
import moment from 'moment';
import Back from '../../component/icon/Back';
import CommonText from '../../component/common/CommonText';
import Bell from '../../component/icon/Bell';
import CommonLine from '../../component/common/CommonLine';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';

export default function ContactScreen({navigation}) {
    const dispatch = useDispatch();
    const firebaseUser = useSelector(state => state.UserReducer.data.firebaseUser);
    const user = useSelector(state => state.UserReducer.data.user);
    const [threads, setThreads] = useState([]);
    const lang = useSelector(state => state.LanguageReducer.language);
    useEffect(() => {
        const contactListener = firestore()
            .collection('THREADS')
            .where('users', 'array-contains-any', [firebaseUser.user.uid,user.email])
            .orderBy('latestMessage.createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                    if (querySnapshot) {
                        const threads = querySnapshot.docs.map(documentSnapshot => {
                            const data = documentSnapshot.data();
                            return {
                                _id: documentSnapshot.id,
                                name: '',
                                latestMessage: {
                                    text: '',
                                },
                                time : moment(data.latestMessage.createdAt).startOf('day').fromNow(),
                                ...data,
                            };
                        });
                        setThreads(threads);
                    }
                },
                error => {
                    console.log(error);
                });
        /**
         * unsubscribe listener
         */
        return () => contactListener();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[styles.topBar, {}]}>
                <TouchableOpacity style={styles.scanner} onPress={() => {
                    navigation.goBack();
                }}>
                    <Back/>
                </TouchableOpacity>
                <CommonText style={{fontSize: 20}}>{lang.chatHistory}</CommonText>
                <TouchableOpacity style={styles.scanner}>
                    <Bell/>
                </TouchableOpacity>
            </Animated.View>
            <CommonLine/>
            <Animated.FlatList
                scrollEventThrottle={16}
                data={threads}
                renderItem={({item}) => {
                    return <MessageItem item={item} user={firebaseUser} navigation={navigation}/>;
                }}
                keyExtractor={(item, index) => `list-item-${index}-${item.color}`}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topBar: {
        height:ResponsiveUtil.statusBarHeight(),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15),
        zIndex: 9999,
    },
    scanner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

