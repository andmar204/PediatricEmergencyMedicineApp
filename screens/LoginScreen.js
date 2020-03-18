import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  KeyboardAvoidingView,
  Dimensions
} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Firebase from '../backend/firebase'

function displayOKAlert(title, message) {
  Alert.alert(
    title,
    message
  );
}

function logUserIn(username, password, props) {
  firebase.auth().signInWithEmailAndPassword(username, password).then(function () {
    Firebase.shared.setUserCount = 1;
    console.log('FBUserCount incremented:',Firebase.shared.getUserCount)
    props.navigation.replace({ routeName: 'SubCategories', params: { categoryId: 'c8' } });
  }).catch(function (err) {
    displayOKAlert('No account with that email was found', 'Feel free to create an account first!')
    console.log(err)
  })
}

let userInfo = {
  userValue: "",
  passwordValue: ""
}

function handleEmail(text) {
  userInfo.userValue = text
}

function handlePassword(text) {
  userInfo.passwordValue = text
}

export default class Login extends Component {
  render() {
    return (
      <KeyboardAvoidingView styles={styles.container} behavior="position" enabled keyboardVerticalOffset="100">
        <View styles={styles.view}>
          <TextInput
            style={[styles.textField, styles.email]}
            placeholder='Email'
            onChangeText={handleEmail}
          />
          <TextInput
            secureTextEntry
            style={styles.textField}
            placeholder='Password'
            onChangeText={handlePassword}
          />
          <TouchableOpacity style={styles.loginButton} onPress={() => {
            logUserIn(userInfo.userValue, userInfo.passwordValue, this.props)
          }}
          >
            <Text style={styles.text}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpButton} onPress={() => {
            this.props.navigation.navigate('SignUp')
          }}
          >
            <Text style={styles.text}>New? Create an account!</Text>
          </TouchableOpacity>
        </View>
      </ KeyboardAvoidingView>
    );
  }
}


let screenHeight = Math.round(Dimensions.get('window').height)
let screenWidth = Math.round(Dimensions.get('window').width)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  textField: {
    fontFamily: 'open-sans-bold',
    height: 60,
    width: '80%',
    textAlign: 'center',
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 30,
  },
  email: {
    marginBottom: 30,
    marginTop: screenHeight * 0.3
  },
  loginButton: {
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
    width: 250,
    backgroundColor: '#00ffb8',
    
    borderRadius: 30,
  },
  signUpButton: {
    marginTop: 20,
    borderColor: '#00e6a4',
    borderWidth: 2,
    alignSelf: 'center',
    padding: 10,
    width: 250,
    
    borderRadius: 30,
  },
  text: {
    fontFamily: 'open-sans-bold',
    textAlign: 'center'
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
})