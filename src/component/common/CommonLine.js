import {StyleSheet, View} from 'react-native';
import React from 'react';
import {ResponsiveUtil} from "../../util/ResponsiveUtil";

const CommonLine = ({...rest}) => {
    const {style} = {...rest};
    return (
        <View {...rest} style={[styles.line, style]}></View>
    );
};
const styles = StyleSheet.create({
    line: {
        backgroundColor: '#F3F6F8',
        width: '100%',
        height: ResponsiveUtil.height(1),
    },

});
export default CommonLine;
