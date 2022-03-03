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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
