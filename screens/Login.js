import React from 'react';
import { StyleSheet, View, Dimensions, TextInput, TouchableOpacity, Text } from 'react-native';

export default function Login(props) {
  return (
    <View style={styles.container}>
      <TextInput style={[styles.textField, styles.email]} placeholder='Email'></TextInput>
      <TextInput secureTextEntry style={styles.textField} placeholder='Password'></TextInput>
      <TouchableOpacity style={styles.button} onPress={() => {
          props.navigation.navigate('Login')
      }}>
        <Text style={styles.text}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {
          props.navigation.navigate('CreateAccount')
      }}>
        <Text style={styles.text}>New? Create an account!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    textField: {
        height: 60,
        width: '80%',
        textAlign: 'center',
        borderColor: 'gray',
        borderWidth: 1
    },
    email: {
        marginBottom: 30
    },
    button: {
        marginTop: 20,
        backgroundColor: '#ddd',
        padding: 10,
        width: 250
    },
    text: {
        textAlign: 'center'
    }
})