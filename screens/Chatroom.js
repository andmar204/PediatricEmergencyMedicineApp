import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import * as firebaseFunctions from 'firebase-functions' 
import Firebase from '../backend/firebase.js/'

var db = firebase.firestore(Firebase);
var userCollection = db.collection('users')
const functions = require('firebase-functions')

let chatText = {
  text: ""
}

function createUserAccount(username, password){
   
}

function handleText(text){
  chatText.text = text
}



export default function Chatroom(props) {

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position" enabled keyboardVerticalOffset='70'>
      <View style={styles.view}>
        <TextInput
          style={styles.textField}
          onChangeText={ handleText }
          multiline
          onChangeText={ handleText }
        />
        <TouchableOpacity style={styles.button} onPress={() => {
          handleText()
        }}>
          <Text style={styles.text}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

let screenHeight = Math.round(Dimensions.get('window').height)
let screenWidth = Math.round(Dimensions.get('window').width)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  }, 
  textField: {
    height: 60,
    width: '80%',
    textAlign: 'left',
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#fdfdfd'
  },
  button: {
    height: 60,
    backgroundColor: '#ddd',
    padding: 10,
    marginLeft: 10,
    marginRight: 10
  },
  text: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  view: {
    top: screenHeight * 0.4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
