import Animated from 'react-native-reanimated';
import {Path, Svg} from 'react-native-svg';
import FastImage from 'react-native-fast-image';

export const AnimatedPath = Animated.createAnimatedComponent(Path);
export const AnimatedSvg = Animated.createAnimatedComponent(Svg);
export const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
