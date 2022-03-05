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
import RouteRangeContext from './Context/routeSetUp';
import RouteContext from './Context/routeContext';

const Tab = createBottomTabNavigator();

function App() {
  const [range, setRange] = useState(30);
  const [origin, setOrigin] = useState(null);
  const [preferences, setPreferences] = useState({ filters: [], type: '' });
  const [rangeSelected, setRangeSelected] = useState(false);
  const routeSetUp = {
    range,
    setRange,
    origin,
    setOrigin,
    preferences,
    setPreferences,
  };
  const [currentRoute, setCurrentRoute] = useState(null);
  const routeCtx = { currentRoute, setCurrentRoute };

  return (
    <RouteRangeContext.Provider value={routeSetUp}>
      <RouteContext.Provider value={routeCtx}>
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
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="selection-marker"
                    color={color}
                    size={size * 1.3}
                  />
                ),
              }}
            >
              {(props) => (
                <RangeSelection
                  {...props}
                  rangeSelected={rangeSelected}
                  setRangeSelected={setRangeSelected}
                />
              )}
            </Tab.Screen>
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
              listeners={({ navigation, route }) => ({
                tabPress: (e) => {
                  // Prevent default action
                  e.preventDefault();
                  if (!currentRoute) setRangeSelected(true);
                  else navigation.navigate('Nav');
                },
              })}
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
      </RouteContext.Provider>
    </RouteRangeContext.Provider>
  );
}

export default App;
