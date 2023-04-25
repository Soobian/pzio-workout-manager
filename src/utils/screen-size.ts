import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// 428 x 926 Iphone 13 Pro Max

const widthBaseScale = SCREEN_WIDTH / 428;
const heightBaseScale = SCREEN_HEIGHT / 926;

const normalize = (size: number, based = 'width'): number => {
    const newSize = (based === 'height') ? size * heightBaseScale : size * widthBaseScale;

    if (Platform.OS === 'android') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
    
}

export { SCREEN_WIDTH, SCREEN_HEIGHT, normalize };