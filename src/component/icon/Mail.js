import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Mail(props) {
    return (
        <Svg
            width={18}
            height={16}
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M.01 1.838a1 1 0 011-1H17a1 1 0 011 1v11.324a2 2 0 01-2 2H2a2 2 0 01-2-2v-11c0-.048.003-.094.01-.14v-.184zM2 4.062v9.1h14v-9.1L11.121 8.94a3 3 0 01-4.242 0L2 4.063zm1.572-1.256h10.856l-4.72 4.72a1 1 0 01-1.415 0l-4.72-4.72z"
                fill="#171717"
            />
        </Svg>
    );
}

export default Mail;
