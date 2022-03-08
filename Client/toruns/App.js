// @ts-nocheck
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as col from './Styles/Colours';
import styles from './Styles/AppStyles';
import {
  useFonts,
  Pridi_300Light,
  Pridi_400Regular,
  Pridi_500Medium,
} from '@expo-google-fonts/pridi';
import {
  Signika_300Light,
  Signika_400Regular,
  Signika_500Medium,
  Signika_600SemiBold,
} from '@expo-google-fonts/signika';

import ProfileStack from './Stacks/ProfileStack';
import Navigation from './Pages/Navigation';
import RangeSelection from './Pages/RangeSelection';

import React, { useState } from 'react';
import RouteSetUp from './Context/routeSetUp';
import RouteContext from './Context/routeContext';
import Loader from './Components/Loader';

const Tab = createBottomTabNavigator();

function App() {
  const [routeParams, setRouteParams] = useState({
    origin: null,
    range: 30,
    filters: [],
    type: '',
  });
  const routeSetUp = { routeParams, setRouteParams };
  const [currentRoute, setCurrentRoute] = useState(null);
  const routeCtx = { currentRoute, setCurrentRoute };
  const [prefsModal, setPrefsModal] = useState(false);

  const [fontsLoaded] = useFonts({
    Pridi_300Light,
    Pridi_400Regular,
    Pridi_500Medium,
    Signika_300Light,
    Signika_400Regular,
    Signika_500Medium,
    Signika_600SemiBold,
  });

  if (!fontsLoaded) return <Loader />;

  return (
    <RouteSetUp.Provider value={routeSetUp}>
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
                  prefsModal={prefsModal}
                  setPrefsModal={setPrefsModal}
                />
              )}
            </Tab.Screen>
            <Tab.Screen
              name="Nav"
              component={Navigation}
              options={{
                tabBarIcon: ({ focused, color, size }) => {
                  if (focused) {
                    return (
                      <MaterialCommunityIcons
                        name="close"
                        color={color}
                        size={size * 1.5}
                      />
                    );
                  }
                  return (
                    <MaterialCommunityIcons
                      name="navigation"
                      color={color}
                      size={size * 1.8}
                    />
                  );
                },
                tabBarItemStyle: {
                  ...styles.tabBarItem,
                  backgroundColor: col.interactive,
                },
              }}
              listeners={({ navigation }) => ({
                tabPress: (e) => {
                  e.preventDefault();
                  if (navigation.isFocused()) {
                    navigation.navigate('Home');
                    setCurrentRoute(null);
                  }
                  if (!currentRoute) setPrefsModal(true);
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
    </RouteSetUp.Provider>
  );
}

export default App;
