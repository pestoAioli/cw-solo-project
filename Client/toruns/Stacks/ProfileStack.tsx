import Profile from '../Pages/Profile';
import LocationDetails from '../Components/Location/LocationDetails';
import { createStackNavigator } from '@react-navigation/stack';
import { accent, highContrast } from '../Styles/Colours';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
        options={({ navigation }) => ({
          title: '',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('LocationsList')}
            >
              <MaterialCommunityIcons
                style={{ marginLeft: 10 }}
                name="arrow-left"
                color={highContrast}
                size={30}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};
