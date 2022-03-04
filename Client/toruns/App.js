// @ts-nocheck
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as col from './Styles/Colours';
import styles from './Styles/AppStyles';

import ProfileStack from './Stacks/ProfileStack';
import Navigation from './Screens/Navigation';
import RangeSelection from './Screens/RangeSelection';

import React, { useState } from 'react';
import RouteRangeContext from './Context/context';

const Tab = createBottomTabNavigator();

function App() {
  const [range, setRange] = useState(100);
  const [origin, setOrigin] = useState(null);
  const [rangeSelected, setRangeSelected] = useState(false);
  const routeRange = {
    range,
    setRange,
    origin,
    setOrigin,
  };
  return (
    <RouteRangeContext.Provider value={routeRange}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: col.highContrast,
            tabBarInactiveTintColor: col.highContrastReduced,
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: { display: 'none' },
            tabBarItemStyle: styles.tabBarItem,
          }}
        >
          <Tab.Screen
            name="Home"
            children={() => <RangeSelection rangeSelected={rangeSelected} />}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="selection-marker"
                  color={color}
                  size={size * 1.3}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Nav"
            component={Navigation}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="navigation"
                  color={color}
                  size={size * 1.8}
                />
              ),
              tabBarItemStyle: {
                ...styles.tabBarItem,
                backgroundColor: col.interactive,
              },
            }}
            listeners={{
              tabPress: (e) => {
                // Prevent default action
                e.preventDefault();
                setRangeSelected(true);
              },
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="face-profile-woman"
                  color={color}
                  size={size * 1.3}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </RouteRangeContext.Provider>
  );
}

export default App;
