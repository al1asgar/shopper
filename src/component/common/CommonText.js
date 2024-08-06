import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {ResponsiveUtil} from "../../util/ResponsiveUtil";

const CommonText = ({children, ...rest}) => {
    const {style} = {...rest};
    return (
        <Text {...rest} style={[textStyle.default, style]}>{children}</Text>
    );
};
export const textStyle = StyleSheet.create({
    default: {
        fontSize: ResponsiveUtil.font(16),
        fontWeight : '700',
        lineHeight : ResponsiveUtil.width(24),
        color: '#000',
        letterSpacing : ResponsiveUtil.width(-0.4)
    }
});
export default CommonText;
