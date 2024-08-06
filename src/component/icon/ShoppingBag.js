import * as React from "react"
import {Path} from "react-native-svg"
import {StyleSheet} from 'react-native';
import {AnimatedSvg} from "../common/CommonAnimated";

function ShoppingBag(props) {
    const {activeOpacity, inActiveOpacity} = props;
    return (
        <>
            <AnimatedSvg
                width={27}
                height={27}
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
                style={[styles.container, {opacity: activeOpacity}]}
            >
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1zM2 5a3 3 0 013-3h14a3 3 0 013 3v14a3 3 0 01-3 3H5a3 3 0 01-3-3V5z"
                    fill="#000"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 12c-2.761 0-5-2.686-5-6h2c0 2.566 1.67 4 3 4s3-1.434 3-4h2c0 3.314-2.239 6-5 6z"
                    fill="#000"
                    fillOpacity={0.6}
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19 27a8 8 0 100-16 8 8 0 000 16z"
                    fill="#000"
                >
                </Path>
            </AnimatedSvg>
            <AnimatedSvg
                width={27}
                height={27}
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
                style={[styles.container, {opacity: inActiveOpacity}]}
            >
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1zM2 5a3 3 0 013-3h14a3 3 0 013 3v14a3 3 0 01-3 3H5a3 3 0 01-3-3V5z"
                    fill="#000"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 12c-2.761 0-5-2.686-5-6h2c0 2.566 1.67 4 3 4s3-1.434 3-4h2c0 3.314-2.239 6-5 6z"
                    fill="#000"
                    fillOpacity={0.6}
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19 27a8 8 0 100-16 8 8 0 000 16z"
                    fill="#000"
                />
            </AnimatedSvg>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute'
    },
});
export default ShoppingBag;
