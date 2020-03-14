import React from 'react';
import { View, Text, StyleSheet, Button, FlatList ,TouchableOpacity } from 'react-native';

import {CATEGORIES} from '../data/categoriesData';
import CategoryGridTile from '../components/CategoryGridTile';
import * as firebase from 'firebase';





const CategoriesScreen = props => {
  
  //added here to get acces to props
  const renederGridItem = (itemData) => { 
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        //onSelect func name trigget on component
        onSelect={() => 
          { 
            
            if(itemData.item.title === 'Chatroom'){
              if (firebase.auth().currentUser){
              props.navigation.navigate({routeName: 'Chatroom',name: firebase.auth().currentUser.email})}
                else{
                  props.navigation.navigate({routeName: 'Login'});
                }
            }else if (itemData.item.title === 'Search'){
              props.navigation.navigate({routeName: 'Search'});
            }else
            props.navigation.navigate({routeName: 'SubCategories',params: {categoryId: itemData.item.id}});
        }}
      />
    );
  };

 


  return (
    <FlatList data = {CATEGORIES} renderItem ={renederGridItem} numColumns={2}/>
    
  );
};

CategoriesScreen.navigationOptions ={
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

export default CategoriesScreen;
