import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Time(props) {
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm1-9V7h-2v6h5v-2h-3z"
                fill="#171717"
            />
        </Svg>
    );
}

export default Time;
