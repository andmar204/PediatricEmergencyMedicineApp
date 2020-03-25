import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase'
import { CATEGORIES } from '../data/categoriesData';
import CategoryGridTile from '../components/CategoryGridTile';

const CategoriesScreen = props => {

  //added here to get acces to props
  const renederGridItem = (itemData) => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        //onSelect func name triggers on component
        onSelect={() => {
          if (itemData.item.title === 'Chatroom & CME') {
            if (firebase.auth().currentUser) {
              props.navigation.navigate({ routeName: 'SubCategories', params: { categoryId: itemData.item.id, categoryTitle: itemData.item.title } });
            } else {
              props.navigation.navigate({ routeName: 'Login' })
            }
          } else if (itemData.item.title === 'Search') {
            props.navigation.navigate({ routeName: 'Search' });
          } else {
            props.navigation.navigate({ routeName: 'SubCategories', params: { categoryId: itemData.item.id, categoryTitle: itemData.item.title } });
          }
        }}
      />
    );
  };

  return (
    <FlatList data={CATEGORIES} renderItem={renederGridItem} numColumns={2} />
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

export default CategoriesScreen;
