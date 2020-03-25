import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Firebase from '../backend/firebase.js/'

var db = firebase.firestore(/*Firebase*/);
var userCollection = db.collection('users')

function displayOKAlert(title, message) {
  Alert.alert(
    title,
    message
  );
}

export default class CreateAccount extends Component {

  static navigationOptions = {
    title: 'Sign Up',
  };

  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: ""
    }
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
  }

  handleEmail(text){
    this.setState({username: text})
  }
  
  handlePassword(text){
    this.setState({password: text})
  }

  clearTextInputs(){
    this.setState({username: "", password: ""})
  }

  createUserAccount(username, password, props) {
    firebase.auth().createUserWithEmailAndPassword(username, password).then(function () {
      displayOKAlert('Success!', 'Your account has been created')
      props.navigation.navigate('Login')
      firebase.auth().signOut().then(function() {
        console.log('User has been signed out')
      }).catch(function (err) {
        console.log('An error has occured in createUserAccount signOut: ',
          err,
          '\nU:', username,
          '| P:', password);
      })
    }).catch(function (err) {
      displayOKAlert('Oh no!', (err + "").substring(7))
      console.log('An error has occured in createUserAccount createUserWithEmailAndPassword: ',
        err,
        '\nU:', username,
        '| P:', password);
    })
    this.clearTextInputs()
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={[styles.textField, styles.email]}
          placeholder='Email'
          onChangeText={this.handleEmail}
          value={this.state.username}
        />
        <TextInput
          secureTextEntry
          style={styles.textField}
          placeholder='Password (At least 6 characters)'
          onChangeText={this.handlePassword}
          value={this.state.password}
        />
        <TouchableOpacity style={styles.button} onPress={() => {
          this.createUserAccount(this.state.username, this.state.password, this.props)
        }}>
          <Text style={styles.text}>Confirm</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 30
  },
  email: {
    marginBottom: 30
  },
  button: {
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: '#00ffb8',
    padding: 10,
    width: 250
  },
  text: {
    fontFamily: 'open-sans-bold',
    textAlign: 'center'
  }
})