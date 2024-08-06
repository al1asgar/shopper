import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Checkbox from "../icon/Checkbox";
import {ResponsiveUtil} from "../../util/ResponsiveUtil";

function CommonCheckbox({style, ...rest}) {
    const {value, onChange} = {...rest};
    const [checked, setChecked] = useState(false);
    return (
        <TouchableOpacity activeOpacity={0.9} {...rest} style={[styles.container, style]} onPress={() => {
            setChecked(!checked);
            onChange(!checked);
        }}>
            <Checkbox checked={checked}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: ResponsiveUtil.width(32),
        height: ResponsiveUtil.height(16)
    }
});
export default CommonCheckbox;
