import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Search(props) {
    const {focused} = props;
    let bg = '#919191';
    if(focused){
        bg = '#171717';
    }
    return (
        <Svg
            width={19}
            height={19}
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.395 12.976a8.044 8.044 0 00-12.04-10.62 8.043 8.043 0 0010.621 12.04l.043.044 4.265 4.266a1.005 1.005 0 101.422-1.422l-4.266-4.265a1.198 1.198 0 00-.045-.043zm-2.152-9.219a6 6 0 11-8.486 8.486 6 6 0 018.486-8.486z"
                fill={bg}
            />
        </Svg>
    );
}

export default Search;
