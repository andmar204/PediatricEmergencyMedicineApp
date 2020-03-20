import React, { useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button , FlatList } from 'react-native';
import {CONTENT, SUBCATEGORIES} from '../data/categoriesData';
import SearchGridtile from '../components/SearchGridTile';

const SearchScreen = props => {// to be call Search

  const [enteredSearch, setEnteredSearch] = useState('');
  const [search, setSearch] = useState([]);
  const [result, setResult] = useState('null');//use null value cuz if empty .filter will display all
 
  
  
  
  const searchInputHandler = (enteredText) =>{  
    setEnteredSearch(enteredText)
  };

  const addToSearches = () => {
    setSearch(currentSearch => [...search, enteredSearch] )
    
  };

  const displaySub = SUBCATEGORIES.filter(cat => cat.title.indexOf(result) >= 0);

  const mody = () => {
    setResult(search)
    };
    

    const renederGridItem = (itemData) => { 
      return (
        <SearchGridtile
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
  

  return (
    <View  style = {styles.screen}>
      <View style = {styles.inputContainer}>
        <TextInput placeholder = "search..." 
        style = {styles.input} onChangeText = {searchInputHandler} Value = {enteredSearch}/>
        <Button title = "Add" style = {styles.searchButton} onPress = {addToSearches} /> 
        <Button title = "search" style = {styles.searchButton} onPress = {mody} />
         
      </View>
      <View><Text>{search}</Text></View>
      

      <FlatList data = {displaySub} renderItem ={renederGridItem} numColumns={1}/>


      
      
   
      
    </View>
  );
}

const styles = StyleSheet.create({

  screen: {padding: 50},
  inputContainer : {flexDirection: 'row' ,justifyContent : 'space-between' , alignItems: 'center'},
  input: {width: '80%', borderBottomColor : 'blue', borderBottomWidth: 1},
  searchButton: {borderStyle: 'solid' , borderColor: 'blue'}
  
});


export default SearchScreen;


/* View of items before SearchGridtile
<View>
      <FlatList data = {displaySub} renderItem ={({item}) => 
     <Text>{item.title}</Text>} numColumns={1}/>
      </View>
      */