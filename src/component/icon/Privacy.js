import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function Privacy(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="prefix__feather prefix__feather-check-circle"
            {...props}
        >
            <Path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <Path d="M22 4L12 14.01l-3-3" />
        </Svg>
    )
}

export default Privacy;
