import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { CONTENT, SUBCATEGORIES } from '../data/categoriesData';
import SearchGridtile from '../components/SearchGridTile';

const SearchScreen = props => {// to be call Search

  let changingText = '';
  const [enteredSearch, setEnteredSearch] = useState('');
  const [search, setSearch] = useState([]);
  //const [result, setResult] = useState('null');//use null value because if it's empty, filter will display all
  const [result, setResult] = useState();//use null value because if it's empty, filter will display all

  const searchInputHandler = (enteredText) => {
    setEnteredSearch(enteredText)
  };

  const searchWord = () => {
    setResult(enteredSearch)
  };

  //const displaySub = SUBCATEGORIES.filter(cat => cat.title.indexOf(result) >= 0);

  //1) Go through all subcategories and get words that contain enteredSearch
  //2) Put those in an array
  //3) Set displaySub to that array

  //const containingWord = SUBCATEGORIES.filter(cat => (cat.title.includes(changingText)));
  const displaySub = SUBCATEGORIES.filter(cat => ((cat.title).toLowerCase().indexOf(result.toLowerCase()) >= 0) && cat.title != 'Chatroom' && cat.title != 'CME');
  //const displaySub = containingWord;

  const renederGridItem = (itemData) => {
    return (
      <SearchGridtile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => { //onSelect func name trigget on component
          props.navigation.navigate({
            routeName: 'CatContent',
            params: {
              categoryId: itemData.item.id
            }
          });
        }}
      />
    );
  };


  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Search"
          style={styles.input} onChangeText={searchInputHandler} Value={enteredSearch} />
        <Button title="Search" style={styles.searchButton} onPress={searchWord} />
      </View>
      <FlatList data={displaySub} renderItem={renederGridItem} numColumns={1} />
    </View>
  );
}

const styles = StyleSheet.create({

  screen: { padding: 50 },
  inputContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  input: { width: '80%', borderBottomColor: 'blue', borderBottomWidth: 1 },
  searchButton: { borderStyle: 'solid', borderColor: 'blue' }

});


export default SearchScreen;
