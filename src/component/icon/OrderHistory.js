import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function OrderHistory(props) {
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
            className="prefix__feather prefix__feather-file-text"
            {...props}
        >
            <Path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <Path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
        </Svg>
    )
}

export default OrderHistory;
