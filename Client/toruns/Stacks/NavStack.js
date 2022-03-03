import Navigation from './../Screens/Navigation';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default () => {
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
};
