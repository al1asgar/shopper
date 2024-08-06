import * as React from 'react';
import Svg, {Path} from 'react-native-svg';


function Checkbox(props) {
    const {checked} = props;
    const check = (
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
            d="M3.333.667A2.667 2.667 0 00.667 3.333v9.334a2.667 2.667 0 002.666 2.666h9.334a2.667 2.667 0 002.666-2.666V3.333A2.667 2.667 0 0012.667.667H3.333zM12.667 2H3.333C2.597 2 2 2.597 2 3.333v9.334C2 13.403 2.597 14 3.333 14h9.334c.736 0 1.333-.597 1.333-1.333V3.333C14 2.597 13.403 2 12.667 2zM4 8.047l2.828 2.829 4.715-4.714-.943-.943L6.828 8.99 4.943 7.105 4 8.047z"
            fill="#171717"
        />
     </Svg>
    );
    const uncheck = (
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
                d="M.667 3.333A2.667 2.667 0 013.333.667h9.334a2.667 2.667 0 012.666 2.666v9.334a2.667 2.667 0 01-2.666 2.666H3.333a2.667 2.667 0 01-2.666-2.666V3.333zM3.333 2h9.334C13.403 2 14 2.597 14 3.333v9.334c0 .736-.597 1.333-1.333 1.333H3.333A1.333 1.333 0 012 12.667V3.333C2 2.597 2.597 2 3.333 2z"
                fill="#171717"
            />
        </Svg>
    )
    return checked ? check : uncheck;
}

export default Checkbox;
