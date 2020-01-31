import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
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

function createUserAccount(username, password){
  userCollection.doc(username).get().then(function(doc){
    if(doc.exists){
      displayOKAlert('Username is taken!', 'Please try a different one.')
    } else {
      userCollection.doc(username).set({
        email: username,
        password: password
      })
      displayOKAlert('Success!', 'Your account has been created.')
    }
  }).catch(function(err) {
    displayOKAlert('An error has occured', '')
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

export default function CreateAccount() {

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
        createUserAccount(userInfo.userValue, userInfo.passwordValue)
      }}>
        <Text style={styles.text}>Confirm</Text>
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
