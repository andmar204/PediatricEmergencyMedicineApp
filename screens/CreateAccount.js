import React from 'react';
import { StyleSheet, View, Dimensions, TextInput, TouchableOpacity, Text, ToastAndroid } from 'react-native';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC7THmTy5jrNwAW_BBk1xtQBLCqKzmY9TM",
  authDomain: "pemapp-9eba9.firebaseapp.com",
  databaseURL: "https://pemapp-9eba9.firebaseio.com",
  storageBucket: "pemapp-9eba9.appspot.com",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

var db = firebase.database();

function createUserAccount(userId){
  db.ref('users/' + "G5zGCkDPju8krQS00euU").set({
    password: "newPassword"
  })
}

export default function CreateAccount() {
  return (
    <View style={styles.container}>
      <TextInput style={[styles.textField, styles.email]} placeholder='Email'></TextInput>
      <TextInput secureTextEntry style={styles.textField} placeholder='Password'></TextInput>
      <TouchableOpacity style={styles.button} onPress={() => {
        //This does nothing yet
        createUserAccount()
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
