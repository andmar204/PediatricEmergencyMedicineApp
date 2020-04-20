import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
  Image
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

/**
 * Logs a user in with the specified username and password. This also increments
 * userCount, adds the username to the onlineUsers list, and sends them to the 
 * Chatroom & CME screen.
 * @param {string} username 
 * @param {string} password 
 * @param {Object} props 
 */
function logUserIn(username, password, props) {
  firebase.auth().signInWithEmailAndPassword(username, password).then(function () {
    Firebase.shared.setUserCount = 1;
    Firebase.shared.addOnlineUser(username)
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

  static navigationOptions = {
    title: 'Login',
  };

  render() {
    return (
      <KeyboardAvoidingView styles={styles.container} behavior="position" enabled keyboardVerticalOffset="100">
        <View>
          <Image style={styles.logo} source={require('../data/logo.png')} />
        </View>
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
    marginTop: screenHeight * 0.18
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
  },
  logo: {
    width: 250,
    height: 150,
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginTop: 20,
    marginLeft:30
  }
})