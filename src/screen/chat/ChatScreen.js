import React, {useEffect, useState} from 'react';
import {Bubble, GiftedChat, Message, Send, SystemMessage, Time} from 'react-native-gifted-chat';
import {ActivityIndicator, Animated, SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import Back from '../../component/icon/Back';
import CommonText from '../../component/common/CommonText';
import Bell from '../../component/icon/Bell';
import CommonLine from '../../component/common/CommonLine';
import CommonNumberFormat from '../../component/common/CommonNumberFormat';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';

export default function ChatScreen({route, navigation}) {
    const [messages, setMessages] = useState([]);
    const {thread} = route.params;
    const currentUser = useSelector(state => state.UserReducer.data.firebaseUser.user);
    const lang = useSelector(state => state.LanguageReducer.language);
    useEffect(() => {
        const messagesListener = firestore()
            .collection('THREADS')
            .doc(thread._id)
            .collection('MESSAGES')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                if (querySnapshot) {
                    const messages = querySnapshot.docs.map(doc => {
                        const firebaseData = doc.data();
                        const data = {
                            _id: doc.id,
                            text: '',
                            createdAt: new Date().getTime(),
                            ...firebaseData,
                        };
                        if (firebaseData.user.email != currentUser.email && !data.received) {
                            firestore()
                                .collection('THREADS')
                                .doc(thread._id)
                                .collection('MESSAGES')
                                .doc(data._id)
                                .set({
                                    received: true,
                                }, {merge: true}).then(() => {
                            });
                        }
                        return data;
                    });
                    setMessages(messages);
                }
            });
        // Stop listening for updates whenever the component unmounts
        return () => messagesListener();
    }, []);

    async function handleSend(messages) {
        const text = messages[0].text;
        await firestore()
            .collection('THREADS')
            .doc(thread._id)
            .collection('MESSAGES')
            .add({
                text,
                createdAt: new Date().getTime(),
                user: {
                    _id: currentUser.uid,
                    email: currentUser.email,
                    avatar: currentUser.photoURL,
                },
                type: 'text',
                sent: true,
                received: false,
            });
        await firestore()
            .collection('THREADS')
            .doc(thread._id)
            .set({
                    latestMessage: {
                        text,
                        createdAt: new Date().getTime(),
                    },
                },
                {merge: true},
            );
    }

    function renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#bdd9f1',
                    },
                }}
                textStyle={{
                    right: {
                        color: 'black',
                    },
                }}
                renderTime={(props) => {
                    return (
                        <Time
                            {...props}
                            timeTextStyle={{
                                left: {
                                    color: 'black',
                                },
                                right: {
                                    color: 'black',
                                },
                            }}
                        />
                    );
                }}
                tickStyle={{color: '#000'}}

            />
        );
    }

    function renderLoading() {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color='#bdd9f1'/>
            </View>
        );
    }

    function renderSend(props) {
        return (
            <Send {...props}>
                <View style={styles.sendingContainer}>
                    <IconButton icon='send-circle' size={32} color={'#bdd9f1'}/>
                </View>
            </Send>
        );
    }

    function scrollToBottomComponent() {
        return (
            <View style={styles.bottomComponentContainer}>
                <IconButton icon='chevron-double-down' size={36} color={'#bdd9f1'}/>
            </View>
        );
    }

    function renderSystemMessage(props) {
        return (
            <SystemMessage
                {...props}
                wrapperStyle={styles.systemMessageWrapper}
                textStyle={styles.systemMessageText}
            />
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[styles.topBar, {}]}>
                <TouchableOpacity style={styles.scanner} onPress={() => {
                    navigation.goBack();
                }}>
                    <Back/>
                </TouchableOpacity>
                <CommonText style={{fontSize: 20}}>{lang.liveChat}</CommonText>
                <TouchableOpacity style={styles.scanner}>
                    <Bell/>
                </TouchableOpacity>
            </Animated.View>
            <CommonLine/>
            <GiftedChat
                messages={messages}
                onSend={handleSend}
                user={{_id: currentUser.uid}}
                placeholder={lang.typeYourMessageHere}
                alwaysShowSend
                showUserAvatar
                scrollToBottom
                renderBubble={renderBubble}
                renderLoading={renderLoading}
                renderSend={renderSend}
                scrollToBottomComponent={scrollToBottomComponent}
                renderSystemMessage={renderSystemMessage}
                renderMessage={(props) => {
                    const {currentMessage} = props;
                    if (currentMessage.type === 'order') {
                        let color = 'red';
                        if (currentMessage.order.status === 'completed') {
                            color = 'green';
                        } else if (currentMessage.order.status === 'processing') {
                            color = '#9b9b9b';
                        }
                        return (
                            <TouchableOpacity style={styles.orderContainer} onPress={() => {
                                navigation.navigate('OrderHistoryDetailScreen', {item: currentMessage.order});
                            }}>
                                <View style={{width: ResponsiveUtil.width(72), height: ResponsiveUtil.width(72)}}>

                                </View>
                                <View style={styles.orderInformation}>
                                    <View style={{flex: 2}}>
                                        <CommonText style={{
                                            fontSize: 14,
                                            fontWeight: '600',
                                        }}>Order No #{currentMessage.order.id}</CommonText>
                                        <CommonText style={{
                                            fontSize: 14,
                                            fontWeight: '600',
                                        }}>{currentMessage.order.shipping.first_name} {currentMessage.order.shipping.last_name}</CommonText>
                                        <CommonNumberFormat value={currentMessage.order.total}/>
                                    </View>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        <View style={{backgroundColor: color, padding: 5, borderRadius: 10}}>
                                            <CommonText style={{
                                                color: 'white',
                                                fontSize: 14,
                                                fontWeight: '600',
                                            }}>{currentMessage.order.status}</CommonText>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );

                    }
                    return <Message {...props} />;
                }}
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
        height: ResponsiveUtil.statusBarHeight(),
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
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomComponentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    systemMessageWrapper: {
        backgroundColor: '#bdd9f1',
        borderRadius: 4,
        padding: 5,
    },
    systemMessageText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
    orderContainer: {
        width: '100%',
        height: ResponsiveUtil.width(80),
        paddingLeft: ResponsiveUtil.width(10),
        flexDirection: 'row',
        backgroundColor: '#F3F6F8',
        borderRadius: 10,
        marginBottom: 5,
    },
    orderInformation: {
        flex: 1,
        height: ResponsiveUtil.width(72),
        flexDirection: 'row',
    },
});
