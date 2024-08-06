import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ResponsiveUtil} from "../../util/ResponsiveUtil";
import {ColorUtil} from "../../util/ColorUtil";

function CommonButton({label,style,leftIcon,rightIcon,leftIconStyle,rightIconStyle,labelStyle,...rest}){
    const displayLeftIcon = leftIcon !== undefined ? true : false;
    const displayRightIcon = rightIcon !== undefined ? true : false;
    return (
        <TouchableOpacity style={[styles.container, style]} {...rest}>
            {
                displayLeftIcon &&
                <View style={[styles.leftIcon,leftIconStyle]}>
                    {leftIcon}
                </View>

            }
            <Text style={[styles.text, labelStyle]}>{label}</Text>
            {
                displayRightIcon &&
                <View style={[styles.rightIcon,rightIconStyle]}>
                    {rightIcon}
                </View>

            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorUtil.black,
        width: '100%',
        height: ResponsiveUtil.height(48),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: ResponsiveUtil.width(5)
    },
    text: {
        fontSize: ResponsiveUtil.font(12),
        lineHeight: ResponsiveUtil.height(20),
        color : 'white'
    },
    rightIcon : {
        position : 'absolute',
        width : ResponsiveUtil.width(20),
        height : ResponsiveUtil.height(16),
        right : ResponsiveUtil.width(18),
        top : ResponsiveUtil.height(14)
    },
    leftIcon : {
        position : 'absolute',
        width : ResponsiveUtil.width(20),
        height : ResponsiveUtil.height(16),
        left : ResponsiveUtil.width(18),
        top : ResponsiveUtil.height(14)
    }
});
export default CommonButton;
