import * as React from "react"
import Svg, {
    G,
    Circle,
    Path,
    Defs,
    LinearGradient,
    Stop, Rect,
} from 'react-native-svg';

function Star(props) {
    return (
        <Svg
            width={6}
            height={6}
            viewBox="0 0 6 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Rect width={6} height={6} rx={2} fill="#FFDB47" />
        </Svg>
    );
}

export default Star;
