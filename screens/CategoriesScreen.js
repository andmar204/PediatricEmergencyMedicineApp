import React from 'react';
import { View, Text, StyleSheet, Button, FlatList ,TouchableOpacity } from 'react-native';

import {CATEGORIES} from '../data/categoriesData';
import CategoryGridTile from '../components/CategoryGridTile';



const CategoriesScreen = props => {
  
  //added here to get acces to props
  const renederGridItem = (itemData) => { 
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => { //onSelect func name trigget on component
          props.navigation.navigate({
            routeName: 'SubCategories',
            params: {
              categoryId: itemData.item.id
            }
          });
        }}
      />
    );
  };



  return (
    <FlatList data = {CATEGORIES} renderItem ={renederGridItem} numColumns={2}/>
    
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'blue'
    
  },
  

  
  tittles:{
    fontSize:25,
    color: '#CD5C5C',
    textAlign: 'center'
  }


});

export default CategoriesScreen;
