import RangeSelection from './../Screens/RangeSelection';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default () => {
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
};
