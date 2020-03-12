/*import { SearchBar } from 'react-native-elements';

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
      <SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
}
*/






import React, { useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button , ScrollView } from 'react-native';

export default function App() {// to be call Search

  const [enteredSearch, setEnteredSearch] = useState('');
  const [searches, setSeacrhes] = useState([]);

  
  const searchInputHandler = (enteredText) =>{

    setEnteredSearch(enteredText)
  };

  const addToSearches = () => {

    setSeacrhes(currentSearch => [...searches, enteredSearch] );
  
  };

  return (
    <View  style = {styles.screen}>
      <View style = {styles.inputContainer}>
        <TextInput placeholder = "search..." 
        style = {styles.input} onChangeText = {searchInputHandler} Value = {enteredSearch}/>
        <Button title = "Search" style = {styles.searchButton} onPress = {addToSearches} />  
      </View>
        
        <ScrollView>
        {searches.map((goal) =>(
          <View key = {goal}>
            <Text>{'Results for: '}{goal}</Text>
          </View>
        ))}
        </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({

  screen: {padding: 50},
  inputContainer : {flexDirection: 'row' ,justifyContent : 'space-between' , alignItems: 'center'},
  input: {width: '80%', borderBottomColor : 'blue', borderBottomWidth: 1},
  searchButton: {borderStyle: 'solid' , borderColor: 'blue'}
  
});


