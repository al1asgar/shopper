import {Dimensions,Platform, PixelRatio} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const standardWidth = 375;
const standardHeight = 812;
const statusBarHeight = getStatusBarHeight();
const bottomBarHeight = PixelRatio.roundToNearestPixel(64 * (screenHeight / screenHeight));
export const ResponsiveUtil = {
    width: (w) => {
        return PixelRatio.roundToNearestPixel(w * (screenWidth / standardWidth));
    }, height: (h) => {
        return PixelRatio.roundToNearestPixel(h * (screenHeight / standardHeight));
    }, font: (f) => {
        return PixelRatio.roundToNearestPixel(f * (screenWidth / screenWidth));
    }, screenWidth: () => {
        return screenWidth;
    }, screenHeight: () => {
        return screenHeight;
    }, statusBarHeight: () => {
        return statusBarHeight;
    }, bottomBarHeight: () => {
        return bottomBarHeight;
    }, vc : (h) => {
        return PixelRatio.roundToNearestPixel(h * (screenHeight / standardHeight));
    }, height2: (android,ios) => {
        if(Platform.OS === 'ios'){
            return PixelRatio.roundToNearestPixel(ios * (screenHeight / standardHeight));
        }
        return PixelRatio.roundToNearestPixel(android * (screenHeight / standardHeight));
    },
};
