import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Menu(props) {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="#212121"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

export default Menu;
