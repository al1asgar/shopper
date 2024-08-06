import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {StyleSheet} from 'react-native';


function Back(props) {
    return (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props} style={[styles.container]}>
            <Path
                d="M3 12h18m-11 7l-7-7 7 7zm-7-7l7-7-7 7z"
                stroke="#000"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

const styles = StyleSheet.create({
    container: {},
});
export default Back;
