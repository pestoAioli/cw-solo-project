// @ts-nocheck
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as col from './Styles/Colours';

const Tab = createBottomTabNavigator();

import styles from './Styles/AppStyles';

import HomeStack from './Stacks/HomeStack';
import NavStack from './Stacks/NavStack';
import ProfileStack from './Stacks/ProfileStack';

function App() {
  return (
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
          name="HomeStack"
          component={HomeStack}
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
          name="NavStack"
          component={NavStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="navigation"
                color={color}
                size={size * 1.8}
              />
            ),
            // tabBarItemStyle: {
            //   ...styles.tabBarItem,
            //   backgroundColor: col.interactive,
            // },
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
                size={size * 1.3}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
