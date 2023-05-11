import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Header, Gap, Button} from '../../components';
import {Logo, Items, Inven} from '../../assets';

const Home = ({navigation, route}) => {
  const uid = route.params.uid;
  return (
    <View style={styles.container}>
      <Header textInput="Welcome to INVENTORA" />
      <View style={styles.contentWrapper}>
        <View style={styles.logoWrapper}>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
          <Gap height={10} />
          <Text
            style={styles.titleText}
            onPress={() => navigation.navigate('Profile', {uid: uid})}>
            My Profile
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('AddItems', {uid: uid})}>
            <View style={styles.addItems}>
              <Image source={Items} style={styles.items} resizeMode="contain" />
            </View>
            <Text style={styles.bottomText}>Add Items</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('ListItems', {uid: uid})}>
            <View style={styles.myInven}>
              <Image source={Inven} style={styles.items} resizeMode="contain" />
            </View>
            <Text style={styles.bottomText}>My Inventory</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 20,
            alignSelf: 'center',
          }}>
          <Button
            width={100}
            height={40}
            color="#889FF1"
            title="LOGOUT"
            onPress={() => navigation.navigate('SignIn')}
          />
        </View>
      </View>
    </View>
  );
};

export default Home;

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
    height: 150,
  },
  logo: {
    height: '70%',
    width: '70%',
  },
  items: {
    height: '90%',
    width: '90%',
  },
  titleText: {
    fontWeight: 'bold',
    color: 'white',
  },
  addItems: {
    backgroundColor: '#56ECE3',
    width: 130,
    height: 200,
    borderRadius: 20,
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myInven: {
    backgroundColor: '#607FEC',
    width: 130,
    height: 200,
    borderRadius: 20,
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 12,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
