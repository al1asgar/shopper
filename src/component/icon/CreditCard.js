import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function CreditCard(props) {
    return (
        <Svg
            width={37}
            height={24}
            viewBox="0 0 37 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path fill="#fff" d="M0 0h36.245v23.972H0z" opacity={0.01} />
            <Path fill="#FF5F00" d="M13.344 4.177h9.561v15.617h-9.561z" />
            <Path
                d="M14.328 11.986a9.914 9.914 0 013.793-7.807 9.931 9.931 0 100 15.617 9.915 9.915 0 01-3.793-7.81z"
                fill="#EB001B"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M33.241 17.82v.32h-.06v-.32h-.13v-.066h.328v.067h-.138zm.638-.066v.387h-.07v-.293l-.107.251h-.074l-.108-.25v.292h-.072v-.387h.1l.115.276.116-.276h.1z"
                fill="#F79E1B"
            />
            <Path
                d="M34.19 11.986a9.931 9.931 0 01-16.069 7.807 9.93 9.93 0 000-15.616 9.931 9.931 0 0116.07 7.807v.002z"
                fill="#F79E1B"
            />
        </Svg>
    );
}

export default CreditCard;
