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
                categoryId: itemData.item.id
              }
            });
          }
        }}
      />
    );
  };

  catId = this.props.navigation.getParam('categoryId');
  //how to get specific subcategory
  displaySub = SUBCATEGORIES.filter(meal => meal.subId.indexOf(this.catId) >= 0);

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
      <FlatList data={this.displaySub} renderItem={this.renederGridItem} numColumns={2} />
    );
  }
}

//-----------------------------------------------------------------------------------------------------------------------------------

/*const SubCategoriesScreen = props => {

  //added here to get access to props
  const renederGridItem = (itemData) => {
    if (itemData.item.subId === 'c8') {
      console.log('IN C8 IF')
    }

    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => { //onSelect func name triggers on component
          let isChatroom = itemData.item.id === 'c8-1'
          let isCME = itemData.item.id === 'c8-2'

          if (isChatroom) {
            props.navigation.navigate('Chatroom', { name: firebase.auth().currentUser.email });
          } else if (isCME) {
            props.navigation.navigate('CME', { name: firebase.auth().currentUser.email });
          } else {
            props.navigation.navigate({
              routeName: 'CatContent',
              params: {
                categoryId: itemData.item.id
              }
            });
          }
        }}
      />
    );
  };

  const catId = props.navigation.getParam('categoryId');
  //how to get specific subcategory
  const displaySub = SUBCATEGORIES.filter(meal => meal.subId.indexOf(catId) >= 0);

  return (
    <FlatList data={displaySub} renderItem={renederGridItem} numColumns={2} />
  );
};

export default SubCategoriesScreen;*/
