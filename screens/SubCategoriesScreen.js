import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { CATEGORIES, SUBCATEGORIES } from '../data/categoriesData';
import * as firebase from 'firebase'
import CategoryGridTile from '../components/CategoryGridTile';

const SubCategoriesScreen = props => {

  //added here to get acces to props
  const renederGridItem = (itemData) => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => { //onSelect func name triggers on component
          console.log('ITEMDATA', itemData.item)
          let isChatroom = itemData.item.id === 'c8-1'
          let isCME = itemData.item.id === 'c8-2'

          if (isChatroom) {
            props.navigation.navigate('Chatroom', {name: firebase.auth().currentUser.email});
          } else if (isCME) {
            props.navigation.navigate('CME', {name: firebase.auth().currentUser.email});
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'

  },
  titles: {
    fontSize: 25,
    color: '#CD5C5C',
    textAlign: 'center'
  }
});

export default SubCategoriesScreen;
