import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Share(props) {
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
                d="M18 9a3 3 0 10-2.977-2.63l-6.94 3.47a3 3 0 100 4.319l6.94 3.47a3 3 0 10.895-1.789l-6.94-3.47a3.03 3.03 0 000-.74l6.94-3.47C16.456 8.68 17.19 9 18 9z"
                fill="#8F92A1"
            />
        </Svg>
    )
}

export default Share;
