import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Clear(props) {
    return (
        <Svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.15 3.207a.667.667 0 00-.942.943L7.058 8l-3.85 3.85a.667.667 0 10.942.943L8 8.943l3.85 3.85a.667.667 0 00.943-.943L8.943 8l3.85-3.85a.667.667 0 10-.943-.943L8 7.057l-3.85-3.85z"
                fill="#171717"
            />
        </Svg>
    );
}

export default Clear;
