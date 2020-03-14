import React from 'react';
import { View, Text, StyleSheet, Button, FlatList ,TouchableOpacity } from 'react-native';

import {CATEGORIES, SUBCATEGORIES} from '../data/categoriesData';
import CategoryGridTile from '../components/CategoryGridTile';



const SubCategoriesScreen = props => {
  
  //added here to get acces to props
  const renederGridItem = (itemData) => { 
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => { //onSelect func name trigget on component
          props.navigation.navigate({
            routeName: 'CatContent',
            params: {
              SubCategoryId: itemData.item.id
            }
          });
        }}
      />
    );
  };

  const catId = props.navigation.getParam('categoryId');
  //how to get specific subcategory
  const displaySub = SUBCATEGORIES.filter(cat => cat.subId.indexOf(catId) >= 0);


  return (
    <FlatList data = {displaySub} renderItem ={renederGridItem} numColumns={2}/>

  );
};

SubCategoriesScreen.navigationOptions ={
  headerTitle: 'PEDIATRIC EMERGENCY APP',
  headerStyle: {
    backgroundColor: 'white',
  },

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

export default SubCategoriesScreen;
