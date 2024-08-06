import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Eye(props) {
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
                d="M23.622 12C22.29 6.824 17.592 3 12 3S1.71 6.824.378 12C1.71 17.176 6.408 21 12 21c5.591 0 10.29-3.824 11.622-9zM2.457 12c1.274 4.058 5.067 7 9.543 7 4.475 0 8.269-2.942 9.543-7C20.269 7.942 16.475 5 12 5 7.524 5 3.73 7.942 2.457 12zM12 16a4 4 0 100-8 4 4 0 000 8zm0-2a2 2 0 100-4 2 2 0 000 4z"
                fill="#171717"
            />
        </Svg>
    );
}

export default Eye;
