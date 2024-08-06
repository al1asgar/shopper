import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CommonText from "./CommonText";
import {ResponsiveUtil} from "../../util/ResponsiveUtil";

const CommonTextInput = ({...rest}) => {
    const {leftIcon, rightIcon, onLeftIconClick, onRightIconClick, error, label, style, inputStyle} = {...rest};
    const displayLeftIcon = leftIcon !== undefined ? true : false;
    const displayRightIcon = rightIcon !== undefined ? true : false;
    const displayError = error !== undefined ? true : false;
    return (
        <View style={[textInputStyle.body, style]}>
            <View style={textInputStyle.label} onPress={onLeftIconClick}>
                <CommonText style={{
                    fontSize: ResponsiveUtil.font(14),
                    color: '#6a6a6a',
                    lineHeight: ResponsiveUtil.height(15.62)
                }}>{label}</CommonText>
            </View>
            <View style={[textInputStyle.inputContainer, displayError ? textInputStyle.inputError : {}]}>
                {
                    displayLeftIcon &&
                    <View style={textInputStyle.leftIcon}>
                        {leftIcon}
                    </View>
                }
                <TextInput {...rest} style={[textInputStyle.input, inputStyle]}/>
                {
                    displayRightIcon &&
                    <TouchableOpacity style={textInputStyle.rightIcon} onPress={onRightIconClick}>
                        {rightIcon}
                    </TouchableOpacity>
                }
            </View>
            {
                displayError &&
                <View style={textInputStyle.error}>
                    <CommonText style={{
                        fontSize: ResponsiveUtil.font(14),
                        color: 'red',
                        lineHeight: ResponsiveUtil.height(15.62)
                    }}>{error['message']}</CommonText>
                </View>
            }
        </View>
    );
};
export const textInputStyle = StyleSheet.create({
    body: {
        height: ResponsiveUtil.height(68),
        width: '100%'
    },
    label: {
        height: ResponsiveUtil.height(16),
        width: '100%'
    },
    inputContainer: {
        height: ResponsiveUtil.height(44),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: ResponsiveUtil.width(0.5),
        borderBottomColor: '#6a6a6a'
    },
    leftIcon: {
        height: ResponsiveUtil.height(24),
        width: ResponsiveUtil.width(24),
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightIcon: {
        height: ResponsiveUtil.height(24),
        width: ResponsiveUtil.width(24),
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        fontSize: ResponsiveUtil.vc(18),
        fontWeight: 'bold'

    },
    inputError: {
        borderBottomColor: 'red'
    },
    error: {
        height: ResponsiveUtil.height(16),
        width: '100%',
        marginTop: ResponsiveUtil.vc(5)
    }
});
export default CommonTextInput;
