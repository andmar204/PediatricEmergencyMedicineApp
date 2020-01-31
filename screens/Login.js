import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert, ShadowPropTypesIOS } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Firebase from '../backend/firebase.js/'

var db = firebase.firestore(Firebase);
var userCollection = db.collection('users')

function displayOKAlert(title, message){
  Alert.alert(
    title,
    message,
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  );
}

function logUserIn(username, password, props){
  userCollection.doc(username).get().then(function(doc){
    if(!doc.exists){
      displayOKAlert(
        'We don\'t have an account with that username!',
        'Feel free to create an account'
      );
    } else {
      let userData = doc.data()
      if(userData.password === password){
        props.navigation.navigate('Chatroom')
      } else {
        displayOKAlert(
          'Oh no!',
          'That\'s the incorrect password'
        );
      }
    }
  }).catch(function(err) {
    Alert.alert(
      'An error has occured',
      {err},
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    );
  }) 
}

let userInfo = {
  userValue: "",
  passwordValue: ""
}

function handleEmail(text){
  userInfo.userValue = text
}

function handlePassword(text){
  userInfo.passwordValue = text
}

export default function Login(props) {
  return (
    <View style={styles.container}>
      <TextInput 
        style={[styles.textField, styles.email]}
        placeholder='Email'
        onChangeText={ handleEmail }
      />
      <TextInput
        secureTextEntry
        style={styles.textField}
        placeholder='Password'
        onChangeText={ handlePassword }
      />
      <TouchableOpacity style={styles.button} onPress={() => {
          logUserIn(userInfo.userValue, userInfo.passwordValue, props)
        }}
      >
        <Text style={styles.text}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {
          props.navigation.navigate('CreateAccount')
        }}
      >
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