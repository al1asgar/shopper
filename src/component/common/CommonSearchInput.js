import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import {textInputStyle} from './CommonTextInput';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';

function CommonSearchInput({...rest}) {
    const {leftIcon, rightIcon, onLeftIconClick, onRightIconClick, style, inputStyle, value} = {...rest};
    const displayLeftIcon = leftIcon !== undefined ? true : false;
    const inputRef = useRef(null);
    const displayRightIcon = () => {
        if (value == '') {
            return false;
        } else {
            return true;
        }
    };
    return (
        <View style={[styles.body, style]}>
            <View style={[styles.inputContainer]}>
                {
                    displayLeftIcon &&
                    <View style={textInputStyle.leftIcon}>
                        {leftIcon}
                    </View>
                }
                <TextInput {...rest} style={[styles.input, inputStyle]} ref={inputRef}/>
                {
                    displayRightIcon() &&
                    <TouchableOpacity style={styles.rightIcon} onPress={onRightIconClick}>
                        {rightIcon}
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
};
export default CommonSearchInput;
const styles = StyleSheet.create({
    body: {
        height: ResponsiveUtil.height(66),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        height: ResponsiveUtil.height(48),
        width: ResponsiveUtil.width(345),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F6F8',
        borderRadius: ResponsiveUtil.width(10),
        paddingRight: ResponsiveUtil.width(10),
        paddingLeft: ResponsiveUtil.width(10),
    },

    rightIcon: {
        height: ResponsiveUtil.height(24),
        width: ResponsiveUtil.width(24),
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        fontSize: ResponsiveUtil.font(18),
        fontWeight: 'bold',

    },
});
