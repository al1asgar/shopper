import * as React from "react"
import Svg, { Path } from "react-native-svg"


function Select(props) {
    const {isSelected} = props;
    const active = (
        <Svg
            width={32}
            height={32}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M31 16c0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15C1 7.716 7.716 1 16 1c8.284 0 15 6.716 15 15z"
                stroke="#02C697"
                strokeWidth={2}
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.586 17.414l-2.829-2.828L10.344 16l4.243 4.243 7.071-7.071-1.414-1.415-5.657 5.657z"
                fill="#02C697"
            />
        </Svg>
    );
    const inactive = (
        <Svg
            width={32}
            height={32}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M31 16c0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15C1 7.716 7.716 1 16 1c8.284 0 15 6.716 15 15z"
                stroke="#F3F6F8"
                strokeWidth={2}
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.586 17.414l-2.829-2.828L10.344 16l4.243 4.243 7.071-7.071-1.414-1.415-5.657 5.657z"
                fill="#8F92A1"
            />
        </Svg>
    )
    return (
        isSelected ? active : inactive
    )
}

export default Select;
