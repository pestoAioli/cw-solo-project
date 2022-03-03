// @ts-nocheck
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import RangeSelection from './Screens/RangeSelection';
import Navigation from './Screens/Navigation';
import Profile from './Screens/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Map"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Map"
        component={RangeSelection}
        options={{ title: 'Range selector' }}
      />
    </Stack.Navigator>
  );
}

function NavStack() {
  return (
    <Stack.Navigator
      initialRouteName="Navigation"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Navigation"
        component={Navigation}
        options={{ title: 'Navigation' }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Navigation"
        component={Profile}
        options={{ title: 'Profile' }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#2A362F',
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: { display: 'none' },
          tabBarItemStyle: styles.tabBarItem,
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="selection-marker"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="NavStack"
          component={NavStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="navigation"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="face-profile-woman"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

const tabBarHeight = (1 / 8) * windowHeight;
const itemMargin = windowWidth / 12;
const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    backgroundColor: '#EFF4F2',
    height: tabBarHeight,
    borderTopLeftRadius: tabBarHeight / 2,
    borderTopRightRadius: tabBarHeight / 2,
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#98B66E',
    marginLeft: itemMargin,
    marginRight: itemMargin,
    marginTop: windowWidth / 36,
    height: windowWidth / 6,
    borderRadius: windowWidth / 6,
  },
});
