import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Firebase from '../backend/firebase.js/'

class Chatroom extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Chatroom',
  });

  state = {
    messages: [],
  };

  componentDidMount() {
    Firebase.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
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
const styles = StyleSheet.create({});
export default Chatroom;





/*import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  ToastAndroid
} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Firebase from '../backend/firebase.js/'

var db = firebase.firestore(Firebase);
var userCollection = db.collection('users')
var messageCollection = db.collection('messages')

let chatText = {
  text: "",
  user: ""
}

function handleText(text, username){
  chatText.text = text
  chatText.user = username
}

function submitMessage(user){
  chatText.user = user
  const messageTime = new Date()
  const messageTimestamp = firebase.firestore.Timestamp.fromDate(messageTime)

  const messageId = chatText.user + "|"
    + messageTimestamp.seconds + "|"
    + messageTimestamp.nanoseconds

  messageCollection.doc(messageId).set({
    text: chatText.text,
    time: messageTimestamp,
    user: chatText.user
  })
}

export default function Chatroom(props) {

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position" enabled keyboardVerticalOffset='70'>
      <View style={styles.view}>
        <TextInput
          style={styles.textField}
          onChangeText={ (text) => handleText(text, props.navigation.getParam('username')) }
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={() => {
          submitMessage(props.navigation.getParam('username'))
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
})*/
