import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function User2(props) {
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
            className="prefix__feather prefix__feather-user"
            {...props}
        >
            <Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <Circle cx={12} cy={7} r={4} />
        </Svg>
    )
}

export default User2;
