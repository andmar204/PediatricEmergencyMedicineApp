import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Button, Alert } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Firebase from '../backend/firebase'

var db = firebase.firestore();
var userCollection = db.collection('users')

function displayOKAlert(title, message) {
  Alert.alert(
    title,
    message
  );
}

class Chatroom extends Component {
  constructor(props) {
    super(props)

    this.signOut = this.signOut.bind(this)
  }

  state = {
    messages: [],
  };

  componentDidMount() {
    this.props.navigation.setParams({
      headerRight: (<Button title='Sign out' onPress={() => {
        this.signOut(this.props)
      }} />)
    })
    Firebase.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }

  static navigationOptions = ({
    navigation
  }) => {
    return {
      headerRight: navigation.state.params && navigation.state.params.headerRight,
    };
  };

  signOut = (props) => {
    firebase.auth().signOut().then(function() {
      userCollection.doc(props.navigation.getParam('name')).delete().catch(function(err){
        console.log('Error in sign out, doc.delete()', err)
      })
      Firebase.shared.setUserCount = -1;
      console.log('FBUserCount decremented:',Firebase.shared.getUserCount)
      props.navigation.navigate('Categories')
    }).catch(function(err) {
      displayOKAlert('Oh no!', 'Sign out failed: ' + err)
    });

  }

  componentWillUnmount() {
    Firebase.shared.off();
  }

  get user() {
    // Return our name and our UID for GiftedChat to parse
    return {
      name: this.props.navigation.state.params.name,
      _id: Firebase.shared.uid,
    };
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Firebase.shared.send}
        user={this.user}
      />
    );
  }
}

export default Chatroom;

let screenHeight = Math.round(Dimensions.get('window').height)
let screenWidth = Math.round(Dimensions.get('window').width)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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