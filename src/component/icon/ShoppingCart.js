import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function ShoppingCart(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="prefix__feather prefix__feather-truck"
            {...props}
        >
            <Path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"/>
            <Circle cx={5.5} cy={18.5} r={2.5}/>
            <Circle cx={18.5} cy={18.5} r={2.5}/>
        </Svg>
    );
}

export default ShoppingCart;
