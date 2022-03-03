import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import * as col from './Colours';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const tabBarHeight = (1 / 8) * windowHeight;
const itemMargin = windowWidth / 12;

export default StyleSheet.create({
  tabBar: {
    position: 'absolute',
    backgroundColor: col.background,
    height: tabBarHeight,
    borderTopLeftRadius: tabBarHeight / 2,
    borderTopRightRadius: tabBarHeight / 2,
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: col.accent,
    marginLeft: itemMargin,
    marginRight: itemMargin,
    marginTop: windowWidth / 36,
    height: windowWidth / 6,
    borderRadius: windowWidth / 6,
  },
});
