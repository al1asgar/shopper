import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Add(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="prefix__feather prefix__feather-plus"
            {...props}
        >
            <Path d="M12 5v14M5 12h14" />
        </Svg>
    )
}

export default Add
