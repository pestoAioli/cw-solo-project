import { Dimensions } from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const tabBarHeight = (1 / 8) * windowHeight;
export const itemMargin = windowWidth / 12;
export const headerHeight = windowHeight * 0.13;
