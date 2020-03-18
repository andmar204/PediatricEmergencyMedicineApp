/*import { SearchBar } from 'react-native-elements';
import React from 'react';
import { View, Text } from 'react-native';

export default class App extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <View>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
      />
    <Text>{search}</Text></View>
    );
  }
}
*/







import React, { useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button , FlatList } from 'react-native';
import {CONTENT, SUBCATEGORIES} from '../data/categoriesData';

export default function App() {// to be call Search

  const [enteredSearch, setEnteredSearch] = useState('');
  const [search, setSearch] = useState([]);
  const [data, setData] = useState([
    'Mark','Luke','peter'
  ]);
  const [result, setResult] = useState('p');//just use any value cuz if empty .filter will display all
 
  
  
  let res = '';
  const searchInputHandler = (enteredText) =>{  
    setEnteredSearch(enteredText)
  };

  const addToSearches = () => {
    setSearch(currentSearch => [...search, enteredSearch] );
  };

  const displaySub = SUBCATEGORIES.filter(cat => cat.subId.indexOf(result) >= 0);

  const mody = () => {
    setResult(search)
   
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
      <View><Text>{result}</Text></View>

      <View>
      <FlatList data = {displaySub} renderItem ={({item}) => 
      <Text>{item.title}</Text>} numColumns={1}/>
      </View>
      
   
      
    </View>
  );
}

const styles = StyleSheet.create({

  screen: {padding: 50},
  inputContainer : {flexDirection: 'row' ,justifyContent : 'space-between' , alignItems: 'center'},
  input: {width: '80%', borderBottomColor : 'blue', borderBottomWidth: 1},
  searchButton: {borderStyle: 'solid' , borderColor: 'blue'}
  
});


