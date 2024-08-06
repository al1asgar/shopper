import React from 'react';
import Toast from 'react-native-toast-message';

const CommonToast = {
    error: (data) => {
        const {
            position,
            title,
            message
        } = data;
        Toast.show({
            type: 'error',
            position: position || 'top',
            text1: title || 'Oops',
            text2: message,
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        });
    },
    success: (data) => {
        const {
            position,
            title,
            message
        } = data;
        Toast.show({
            type: 'success',
            position: position || 'top',
            text1: title || 'Success',
            text2: message,
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
            onPress: () => {}
        });
    },

};
export default CommonToast;
