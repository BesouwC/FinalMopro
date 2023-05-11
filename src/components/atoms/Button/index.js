import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({title, color = '#889FF1', textColor = 'white', fontSize = 14, onPress, width, height}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.container(color, width, height)}>
        <Text style={styles.text(textColor, fontSize)}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: (color, width, height) => ({
    height: height,
    width: width,
    backgroundColor: color,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  }),
  text: (textColor, fontSize) => ({
    fontWeight: 'bold',
    fontSize: fontSize,
    fontFamily: 'Poppins-Medium',
    color: textColor,
  }),
});
