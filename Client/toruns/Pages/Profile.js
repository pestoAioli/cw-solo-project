import { StyleSheet, View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import LocationsHeader from '../Components/LocationsHeader';
import { accentLight, highContrast } from '../Styles/Colours';
import { getUserInfo } from '../Services/APIService';
import Loader from '../Components/Loader';
import LocationsListItem from '../Components/LocationsListItem';
import { headerHeight } from '../Styles/Dimensions';

const Profile = ({ route, navigation }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    //For testing, later it should be via authentication;
    const userID = '622769314d76691f6f1ab550';
    getUserInfo(userID).then(setUserInfo);
  }, []);

  return !userInfo ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <LocationsHeader />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Hi {userInfo.name}!</Text>
        <Text style={styles.text}>These are your discovered places:</Text>
      </View>
      <FlatList
        data={userInfo.visited_locations}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <LocationsListItem loc={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: accentLight,
    paddingVertical: headerHeight,
  },
  textContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  title: {
    fontSize: 50,
    color: highContrast,
    fontFamily: 'Signika_500Medium',
  },
  text: {
    fontSize: 22,
    color: highContrast,
    fontFamily: 'Signika_300Light',
  },
});
