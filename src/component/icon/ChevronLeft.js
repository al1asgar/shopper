import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ChevronLeft(props) {
    return (
        <Svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="prefix__feather prefix__feather-chevron-left"
            {...props}
        >
            <Path d="M15 18l-6-6 6-6"/>
        </Svg>
    );
}

export default ChevronLeft;
