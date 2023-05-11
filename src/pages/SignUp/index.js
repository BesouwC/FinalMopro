import {StyleSheet, Text, View, TextInput, Image, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, Gap, Button} from '../../components';
import {Logo} from '../../assets';
import authentication, {db} from '../../config/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {ref as r, update} from 'firebase/database';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [FullName, setFullName] = useState('');

  const handleSignUp = () => {
    if (!FullName && !email && !password) {
      alert('Please fill all fields');
      return;
    } else if (!FullName) {
      alert('Please enter your full name');
      return;
    } else if (!email) {
      alert('Please enter your email');
      return;
    } else if (!password) {
      alert('Please enter your password');
      return;
    }

    createUserWithEmailAndPassword(authentication, email, password)
      .then(re => {
        console.log(re);
        update(r(db, `User/${authentication.currentUser.uid}`), {
          Email: email,
          Name: FullName,
        });
        Alert.alert('Success!', 'You are now registered');
        setTimeout(() => {
          navigation.navigate('SignIn');
        }, 2000);
      })
      .catch(error => {
        Alert.alert('Alert!', error.message);
        console.log('Error:', error.message);
      });
  };
    
  return (
    <View style={styles.container}>
      <Header
        onBack={true}
        onPress={() => navigation.goBack()}
        textInput="Sign Up"
      />
      <View style={styles.contentWrapper}>
        <View style={styles.logoWrapper}>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
          <Gap height={10} />
          <Text style={styles.titleText}>DIGITAL STOCK</Text>
        </View>
        <Text style={styles.title}>Full Name</Text>
        <TextInput
          style={styles.textInput}
          placeholderTextColor="#A39D9D"
          placeholder="Type your Full Name"
          value={FullName}
          onChangeText={text => setFullName(text)}
        />
        <Gap height={16} />
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
          title="REGISTER"
          onPress={handleSignUp}
        />
        <Gap height={16} />
        <Button
          width={350}
          height={40}
          color="#889FF1"
          title="Already Have an Account?"
          onPress={() => navigation.navigate('SignIn')}
        />
      </View>
    </View>
  );
};

export default SignUp;

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
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 15,
    marginBottom: 6,
    color: 'white',
  },
});
