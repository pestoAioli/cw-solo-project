import Profile from './../Pages/Profile';
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
        name="Navigation"
        component={Profile}
        options={{ title: 'Profile' }}
      />
    </Stack.Navigator>
  );
};
