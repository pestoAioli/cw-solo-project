import Profile from './../Pages/Profile';
import LocationDetails from './../Components/Location/LocationDetails';
import { createStackNavigator } from '@react-navigation/stack';
import { accent } from '../Styles/Colours';
const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerStyle: {
          backgroundColor: accent,
          opacity: 0.95,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="LocationsList"
        component={Profile}
        options={{ title: 'Profile', headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={LocationDetails}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  );
};
