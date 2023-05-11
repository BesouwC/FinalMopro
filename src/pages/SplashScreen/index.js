import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import { Logo } from '../../assets/icons';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SignIn')
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={Logo} style={{height: '30%', width: '30%'}} resizeMode="contain" />
      <Text style={styles.text}>INVENTORA</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#212A3E',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '20%',
  },
  text: {
    color: '#D158A8',
    fontSize: 32,
    lineHeight: 50,
    fontFamily: 'Poppins-Medium',
  },
});
