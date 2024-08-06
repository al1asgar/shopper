import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Address(props) {
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
                d="M13 14.917A6.002 6.002 0 0012 3a6 6 0 00-1 11.917V20a1 1 0 102 0v-5.083zM16 9a4 4 0 11-8 0 4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0z"
                stroke="black"
                strokeWidth={0.5}
            />
        </Svg>
    )
}

export default Address;
