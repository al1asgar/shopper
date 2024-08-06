import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function PaymentFailed(props) {
    return (
        <Svg
            width={80}
            height={80}
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 24C0 10.745 10.745 0 24 0h32c13.255 0 24 10.745 24 24v32c0 13.255-10.745 24-24 24H24C10.745 80 0 69.255 0 56V24z"
                fill="#F8B6C3"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26 24h28a6 6 0 016 6v8a2 2 0 11-4 0v-2H24v12a2 2 0 002 2h8a2 2 0 110 4h-8a6 6 0 01-6-6V30a6 6 0 016-6zm28.357 22.235l-3.291 3.291 3.291 3.347a1.839 1.839 0 010 2.592 1.839 1.839 0 01-2.592 0l-3.291-3.29-3.347 3.254a1.839 1.839 0 01-2.592 0 1.839 1.839 0 010-2.593l3.29-3.31-3.254-3.29a1.839 1.839 0 012.593-2.593l3.31 3.291 3.29-3.291a1.839 1.839 0 112.593 2.592zM56 32H24v-2a2 2 0 012-2h28a2 2 0 012 2v2zm-20 8h-6a2 2 0 100 4h6a2 2 0 100-4z"
                fill="#171717"
            />
        </Svg>
    );
}

export default PaymentFailed;
