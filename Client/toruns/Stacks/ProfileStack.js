import Profile from './../Pages/Profile';
import LocationDetails from './../Components/Location/LocationDetails';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="LocationsList"
        component={Profile}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen
        name="Details"
        component={LocationDetails}
        options={{ title: 'Details' }}
      />
    </Stack.Navigator>
  );
};
