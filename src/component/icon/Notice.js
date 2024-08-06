import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Notice(props) {
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
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10 8a8 8 0 110-16 8 8 0 010 16zm0-13.949a1 1 0 100 2 1 1 0 000-2zm-1 4.928a1 1 0 112 0v6a1 1 0 11-2 0v-6z"
                fill="#171717"
            />
        </Svg>
    );
}

export default Notice;
