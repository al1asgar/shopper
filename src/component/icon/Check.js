import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Check(props) {
    const color = props.color || "#171717";
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
                d="M10.586 13.414l-2.829-2.828L6.343 12l4.243 4.243 7.071-7.071-1.414-1.415-5.657 5.657z"
                fill={color}
            />
        </Svg>
    )
}

export default Check;
