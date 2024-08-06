import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {StyleSheet, View} from 'react-native';
import CommonText from "../common/CommonText";
import {ColorUtil} from "../../util/ColorUtil";
import {ResponsiveUtil} from "../../util/ResponsiveUtil";


function Cart(props) {
    const {quantity,focused} = props;
    let bg = '#919191';
    if(focused){
        bg = '#171717';
    }
    return (
        <View>

            <Svg
                width={27}
                height={27}
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
            >
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1zM2 5a3 3 0 013-3h14a3 3 0 013 3v14a3 3 0 01-3 3H5a3 3 0 01-3-3V5z"
                    fill={bg}
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 12c-2.761 0-5-2.686-5-6h2c0 2.566 1.67 4 3 4s3-1.434 3-4h2c0 3.314-2.239 6-5 6z"
                    fill={bg}
                    fillOpacity={0.4}
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19 27a8 8 0 100-16 8 8 0 000 16z"
                    fill={bg}
                />
            </Svg>
            <View style={styles.number}>
                <CommonText style={{color : 'white',fontSize : ResponsiveUtil.font(13)}}>{quantity}</CommonText>
            </View>
        </View>

    );
}
const styles = StyleSheet.create({
    number : {
        justifyContent: 'center',
        alignItems: 'center',
        bottom: ResponsiveUtil.height2(0,4),
        right: ResponsiveUtil.height2(0,-0.5),
        position: 'absolute',
        width: ResponsiveUtil.width(15),
        height: ResponsiveUtil.width(15),
        borderRadius: 100,

    }
});

export default Cart;
