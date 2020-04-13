import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import { CATEGORIES, SUBCATEGORIES } from '../data/categoriesData';
import * as firebase from 'firebase'
import 'firebase/firestore';
import Firebase from '../backend/firebase'
import CategoryGridTile from '../components/CategoryGridTile';

let categoryId
let categoryTitle

function displayOKAlert(title, message) {
  Alert.alert(
    title,
    message
  );
}

/**
 * Deletes all messages from the database. 
 */
function deleteAllMessages() {
  firebase.database().ref('userCount').on('value', function (snapshot) {
    if (snapshot.val().count == 0) {
      firebase.database().ref('messages').remove();
    }
  });
}

export default class SubCategoriesScreen extends Component {
  constructor(props) {
    super(props)
    this.signOut = this.signOut.bind(this)
  }

  /**
   * Renders an item for the FlatList. This gets returned for every
   * subcategory in a category. 
   */
  renederGridItem = (itemData) => {
    categoryId = itemData.item.subId
    categoryTitle = this.props.navigation.getParam('categoryTitle')
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => { //onSelect func name triggers on component
          let isChatroom = itemData.item.id === 'c8-1'
          let isCME = itemData.item.id === 'c8-2'
          if (isChatroom) {
            this.props.navigation.navigate('Chatroom', { name: firebase.auth().currentUser.email });
          } else if (isCME) {
            this.props.navigation.navigate('CME', { name: firebase.auth().currentUser.email });
          } else {
            this.props.navigation.navigate({
              routeName: 'CatContent',
              params: {
                subcategoryId: itemData.item.id
              }
            });
          }
        }}
      />
    );
  };

  catId = this.props.navigation.getParam('categoryId');
  //how to get specific subcategory
  displaySub = SUBCATEGORIES.filter(cat => cat.subId.indexOf(this.catId) >= 0);
  displaySubSort = this.displaySub.sort((a, b) => (a.title > b.title) ? 1 : -1);

  /**
   * This sets the sign out button to only appear if the user is in
   * the Chatroom & CME category screen.
   */
  componentDidMount() {
    if (categoryId === 'c8') {
      this.props.navigation.setParams({
        headerRight: (<Button title='Sign out' onPress={() => {
          this.signOut(this.props)
        }} />)
      })
    }
  }

  static navigationOptions = ({
    navigation
  }) => {
    return {
      headerRight: navigation.state.params && navigation.state.params.headerRight,
      title: categoryTitle
    };
  };

  /**
   * Signs a user out. This also takes care of the decrementing of userCount, 
   * the removal of the username from the onlineUsers list, and of the message
   * deletion if the user signing out is the last user that's signed in.
   */
  signOut = (props) => {
    let signOutUser = Firebase.shared.userEmail
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

  render() {
    return (
      <FlatList data={this.displaySubSort} renderItem={this.renederGridItem} numColumns={2} />
    );
  }
}



SubCategoriesScreen.navigationOptions = navigationdata => {
 const catid = navigationdata.navigation.getParam('categoryId');
 const Cattitle = CATEGORIES.find(cat => cat.id === catid)
  return{
  headerTitle: Cattitle.title,
  headerStyle: {
    backgroundColor: 'white',
  }
}
}

