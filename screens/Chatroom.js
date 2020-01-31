import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Dimensions } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Firebase from '../backend/firebase.js/'

var db = firebase.firestore(Firebase);
var userCollection = db.collection('users')

function createUserAccount(username, password){
   
}

function handleText(text){
  
}

export default function Chatroom() {

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={[styles.textField, styles.email]}
          onChangeText={ handleText }
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={() => {
          //
        }}>
          <Text style={styles.text}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

let screenHeight = Math.round(Dimensions.get('window').height)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
    flexDirection: 'row'
  },
  textField: {
    height: 60,
    width: '80%',
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1
  },
  email: {
  },
  button: {
    height: 60,
    backgroundColor: '#ddd',
    padding: 10,
    width: '11%'
  },
  text: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
