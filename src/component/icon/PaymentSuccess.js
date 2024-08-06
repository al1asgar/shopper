import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function PaymentSuccess(props) {
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
                fill="#FFDB47"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M54 24H26a6 6 0 00-6 6v18a6 6 0 006 6h8a2 2 0 100-4h-8a2 2 0 01-2-2V36h32v2a2 2 0 104 0v-8a6 6 0 00-6-6zm3.421 20.583a1.997 1.997 0 00-2.82 0l-6.76 6.615-2.44-2.406a1.998 1.998 0 00-2.83.03 2.009 2.009 0 00.03 2.837l3.84 3.768a1.997 1.997 0 002.8 0l8.16-8.018c.781-.776.79-2.039.02-2.826zM56 32H24v-2a2 2 0 012-2h28a2 2 0 012 2v2zm-20 8h-6a2 2 0 100 4h6a2 2 0 100-4z"
                fill="#171717"
            />
        </Svg>
    );
}

export default PaymentSuccess;
