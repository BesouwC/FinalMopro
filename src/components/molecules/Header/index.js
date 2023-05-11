import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {IconBack} from '../../../assets/icons';

const Header = ({
  onPress,
  navigation,
  SigninColor = 'black',
  SigninColorBack,
  textInput,
  onBack,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <View style={styles.iconBackWrapper}>
          {onBack && (
            <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
              <Image
                source={IconBack}
                style={styles.logo}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.textWrapper}>
          <View style={styles.btnSigninBack(SigninColorBack)}>
            <Text style={styles.btnSignin(SigninColor)}>{textInput}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    backgroundColor: '#889FF1',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  btnSignin: SigninColor => ({
    color: SigninColor,
    fontWeight: 'bold',
    fontSize: 25,
  }),
  btnSigninBack: SigninColorBack => ({
    backgroundColor: SigninColorBack,
    height: '50%',
    width: '100%',
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  iconBackWrapper: {
    marginLeft: 30,
    alignItems: 'center',
  },
  textWrapper: {
    flex: 1,
    marginRight: 30,
    alignItems: 'center',
  },
  logo: {
    height: 30,
    width: 30,
  },
});
