import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';

const {width} = Dimensions.get('window');
const MessageItem = (props) => {
    const {item, navigation} = props;
    const {name, color, latestMessage,time, avatar} = item;
    const randomAvatarIndex = Math.floor(Math.random() * 7) + 1;
    let img = require('../../../assets/avatar1.png');
    switch (randomAvatarIndex) {
        case 2 :
            img = require('../../../assets/avatar2.png');
            break;
        case 3 :
            img = require('../../../assets/avatar3.png');
            break;
        case 4 :
            img = require('../../../assets/avatar4.png');
            break;
        case 5 :
            img = require('../../../assets/avatar5.png');
            break;
        case 6 :
            img = require('../../../assets/avatar6.png');
            break;
        case 7 :
            img = require('../../../assets/avatar7.png');
            break;
    }
    return (
        <TouchableOpacity style={styles.listItem} onPress={() => {
            navigation.navigate('ChatScreen', {thread: item});
        }}>
            <View
                style={[
                    styles.contactIcon,
                    {
                        backgroundColor: color,
                    },
                ]}
            >
                <FastImage
                    source={img}
                    style={[{width: '100%', height: '100%'}, styles.contactIcon]}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </View>
            <View>
                <View style={{
                    flexDirection : 'row',
                    justifyContent : 'space-between',
                    paddingRight : ResponsiveUtil.width(18)
                }}>
                    <Text style={styles.contactName}>{name}</Text>
                    <Text style={styles.message}>{time}</Text>
                </View>
                <View style={styles.messageContainer}>
                    <Text style={styles.message} numberOfLines={2} ellipsizeMode={'tail'}>
                        {latestMessage.text}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        backgroundColor: '#87cfc7',
        top: 16,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1,
    },
    subHeader: {
        width: '100%',
        paddingHorizontal: 10,
    },
    listItem: {
        flexDirection: 'row',
        width: '95%',
        marginLeft: 10,
        marginTop: 18,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#87cfc7',
    },
    contactIcon: {
        height: 60,
        width: 60,
        borderRadius: 999,
    },
    contactName: {
        marginLeft: 15,
        fontSize: 16,
        color: 'black',
    },
    messageContainer: {
        marginRight: 20,
        paddingHorizontal: 15,
        width: width * 0.8
    },
    message: {
        fontSize: 14,
        color: '#979799',
    },
});

export default MessageItem;
