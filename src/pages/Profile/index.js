import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react'
import { Header, Gap } from '../../components';
import { Profiles } from '../../assets';
import {ref as r, onValue, off, getDatabase, child, get, update, set} from 'firebase/database';

const Profile = ({navigation, route}) => {
  const db = getDatabase();
  const uid = route.params.uid;
  const [FullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const fetchUserDataRealtime = () => {
    const userRef = r(db, `User/${uid}`);
    const onValueChange = onValue(
      userRef,
      snapshot => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setFullName(userData.Name);
          setEmail(userData.Email);
        } else {
          console.log('No data available for the user.');
        }
      },
      error => {
        console.error('Error fetching user data:', error);
      },
    );

    // Cleanup function to remove the listener when the component is unmounted
    return () => off(userRef, 'value', onValueChange);
  };
  useEffect(() => {
    if (uid) {
      fetchUserDataRealtime();
    }
  }, [uid]);
  return (
    <View style={styles.container}>
      <Header
        onBack={true}
        onPress={() => navigation.goBack()}
        textInput="Profile"
      />
      <View style={styles.contentWrapper}>
        <View style={styles.logoWrapper}>
          <Image source={Profiles} style={styles.logo} resizeMode="contain" />
          <Gap height={20} />
          <Text>Welcome Back</Text>
          <Text style={styles.titleText}>{`${FullName}`}</Text>
          <Text style={styles.titleText}>{`${email}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2CECE',
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: '#212A3E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 30,
    paddingTop: 26,
    marginTop: 24,
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    marginTop: 140
  },
  logo: {
    height: '70%',
    width: '70%',
  },
  titleText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20
  },
});