import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Button, Alert } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Firebase from '../backend/firebase'

/**
 * Deletes all messages from chatroom once all users are signed out.
 */
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
    this.displayOKAlert = this.displayOKAlert.bind(this)
  }

  state = {
    messages: [],
    onlineUsers: ''
  };

  /**
   * Displays an alert box. If forUsers is set to true, then it will have a refresh button as well, 
   * to refresh the list of online users it will be displaying. Otherwise, it will be a plain alert
   * box.
   * @param {string} title 
   * @param {string} message 
   * @param {boolean} forUsers 
   */
  displayOKAlert(title, message, forUsers) {
    if (forUsers) {
      Alert.alert(
        title,
        message,
        [
          {
            text: 'Refresh', 
            onPress: () => {
              this.setOnlineUsers()
              this.displayOKAlert("Who\'s currently online", this.state.onlineUsers, true)
            }
          },
          { text: 'OK', onPress: () => { } },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        title,
        message
      );

    }
  }

  componentDidMount() {
    this.setOnlineUsers();
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
              this.displayOKAlert(
                "Who\'s currently online",
                this.state.onlineUsers,
                true
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

  /**
   * Sets the onlineUsers string. This is what will be passed to displayOKAlert.
   */
  setOnlineUsers() {
    console.log('RUNNING SETONLINEUSERS')
    let userStr = ''
    firebase.database().ref('onlineUsers').on('value', function (snapshot) {
      let arr = snapshot.val().onlineUsers
      arr.forEach(element => {
        if (!userStr.includes(element)) {
          userStr += element + '\n'
        }
      });
    })
    this.setState({
      onlineUsers: userStr
    })
    console.log('STATE IN SETONLINEUSERS', this.state.onlineUsers)
  }

  /**
   * Signs the user out. This also takes care of the decrementing for userCount,
   * the removal of the username from the onlineUsers list, and (if this user is
   * the last one signed in) the deletion of all the messages. Once they're 
   * signed out, they are sent back to the home page (CategoriesScreen).
   */
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
      this.displayOKAlert('Oh no!', 'Sign out failed: ' + err, false)
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