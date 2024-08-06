import * as React from 'react';
import Svg, { Path, G } from "react-native-svg"
import {StyleSheet} from 'react-native';


function Google(props) {
    return (
        <Svg
            height={24}
            viewBox="0 0 24 24"
            width={24}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M12 24c6.624 0 12-5.376 12-12S18.624 0 12 0 0 5.376 0 12s5.376 12 12 12zm4.283-12.857h1.718V9.426h1.718v1.718h1.703v1.718h-1.703v1.718h-1.718v-1.718h-1.718zm-3.687-3.581L10.97 9.14c-2.08-2.033-6.127-.552-6.127 2.855 0 4.621 6.559 4.937 7.128 1.2H8.579v-2.061h5.657C14.878 14.49 12.711 18 8.579 18v.001A5.991 5.991 0 012.578 12c.001-5.338 6.333-7.861 10.018-4.438z"
                fill="#fff"
            />
        </Svg>
    );
}

const styles = StyleSheet.create({
    container: {},
});
export default Google;
