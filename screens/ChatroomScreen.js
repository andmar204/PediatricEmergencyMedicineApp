import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Button, Alert } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Firebase from '../backend/firebase'

function displayOKAlert(title, message) {
  Alert.alert(
    title,
    message
  );
}

function deleteAllMessages() {
  firebase.database().ref('userCount').on('value', function (snapshot) {
    if (snapshot.val().count == 0) {
      firebase.database().ref('messages').remove();
    }
  });
}

class Chatroom extends Component {
  static navigationOptions = {
    title: 'Chatroom',
  };

  constructor(props) {
    super(props)

    this.signOut = this.signOut.bind(this)
    this.setOnlineUsers = this.setOnlineUsers.bind(this)
  }

  state = {
    messages: [],
    onlineUsers: ''
  };

  componentDidMount() {
    this.props.navigation.setParams({
      headerRight: (
        <View /*style={{ flexDirection: "row" }}*/>
          <Button
            style={styles.signOutButton}
            title='Sign out'
            onPress={() => {
              this.signOut(this.props)
            }}
          />
          <Button
            style={styles.whosOnlineButton}
            title={"Who\'s online"}
            onPress={() => {
              displayOKAlert(
                "Who\'s currently online",
                '|' + 'test' + '|'
              )
            }}
          />
        </View>
      )
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

  setOnlineUsers = () => {

  }

  signOut = (props) => {
    let signOutUser = Firebase.shared.userEmail;
    firebase.auth().signOut().then(function () {
      Firebase.shared.setUserCount = -1;
      Firebase.shared.removeOnlineUser(signOutUser)
      firebase.database().ref('userCount').on('value', function (snapshot) {
        if (snapshot.val().count <= 0) {
          deleteAllMessages()
        }
      })
      props.navigation.navigate('Categories')
    }).catch(function (err) {
      displayOKAlert('Oh no!', 'Sign out failed: ' + err)
      console.log(err)
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

const styles = StyleSheet.create({
  signOutButton: {
    flex: 1,
    marginRight: 3
  },
  whosOnlineButton: {
    flex: 1,
    marginTop: 6
  }
})