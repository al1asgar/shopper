import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Home(props) {
    const {focused} = props;
    let bg = '#919191';
    if(focused){
        bg = '#171717';
    }
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 21c-1.657 0-3-1.36-3-3.037V9.84c0-.034.002-.068.005-.101a2.186 2.186 0 01.631-1.555L9.88 3.89a2.974 2.974 0 014.242 0l6.243 4.295c.407.412.636.972.636 1.555-.002.033 0 .067 0 .101v8.123C21 19.64 19.657 21 18 21H6zm6.707-15.703L19 9.657v8.328c0 .56-.448 1.015-1 1.015h-3v-5.077c0-1.682-1.343-3.046-3-3.046s-3 1.364-3 3.046V19H6c-.552 0-1-.455-1-1.015V9.656l6.293-4.359a.99.99 0 011.414 0z"
                fill={bg}
            />
        </Svg>
    );
}

export default Home;
