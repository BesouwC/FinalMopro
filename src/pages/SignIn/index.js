import {StyleSheet, Text, View, TextInput, Image, Alert } from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, Gap, Button} from '../../components';
import {Logo} from '../../assets';
import authentication, {db} from '../../config/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, ref as r, get, set, update} from 'firebase/database';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!email && !password) {
      alert('Please fill all fields');
      return;
    } else if (!email) {
      alert('Please enter your email');
      return;
    } else if (!password) {
      alert('Please enter your password');
      return;
    }
    signInWithEmailAndPassword(authentication, email, password)
      .then(async re => {
        console.log(re);
        const uid = re.user.uid;
        
        userRef = r(db, `User/${uid}`);

        // Show the success alert
        alert('You are now logged in');
        // Delay the navigation to the appropriate home screen
        setTimeout(() => {
          navigation.navigate('Home', {uid: uid});
        }, 2000); // Add a 2-second (2000 milliseconds) delay before navigating
       
      })
      .catch(error => {
          console.log('Error:', error.message);
          Alert.alert('Alert!', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Header textInput="Sign In" />
      <View style={styles.contentWrapper}>
        <View style={styles.logoWrapper}>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
          <Gap height={10} />
          <Text style={styles.titleText}>DIGITAL STOCK</Text>
        </View>
        <Text style={styles.title}>Email Address</Text>
        <TextInput
          style={styles.textInput}
          placeholderTextColor="#A39D9D"
          placeholder="Type your email address"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Gap height={16} />
        <Text style={styles.title}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholderTextColor="#A39D9D"
          placeholder="Type your password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        <Gap height={24} />
        <Button
          width={350}
          height={40}
          color="#889FF1"
          title="LOGIN"
          onPress={handleSignIn}
        />
        <Gap height={16} />
        <Button
          width={350}
          height={40}
          color="#889FF1"
          title="CREATE NEW ACCOUNT"
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </View>
  );
};

export default SignIn;

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
  titleText: {
    fontWeight: 'bold',
    color: 'white',
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    color: 'black'
  },
  title: {
    fontSize: 15,
    marginBottom: 6,
    color: 'white',
  },
});
