import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import * as firebase from 'firebase'
import 'firebase/firestore';
import CategoriesScreen from './CategoriesScreen';
import { CATEGORIES, SUBCATEGORIES } from '../data/categoriesData';

export default class FilterScreen extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    evaluation: '',
    management: '',
    medications: '',
    symptoms: '',
    references: '',
    set: false
  }

  dataPromise = firebase.firestore().collection('data').doc(this.props.navigation.getParam('subcategoryId')).get()
    .then((doc) => {
      if (doc.exists) {
        this.setState({
          evaluation: doc.data().evaluation,
          management: doc.data().management,
          medications: doc.data().medications,
          symptoms: doc.data().symptoms,
          references: doc.data().references,
          set: true
        })
      }
    })
    .catch(function (err) {
      console.error(err)
    })

  render() {
    if (this.state.set === true) {
      return (
        //<View style={styles.screen}>
        <ScrollView style={styles.screen}>
          <View>  
          <Text style={styles.header}>EVALUATION</Text>
          <Text style={styles.content}>{this.state.evaluation}</Text>
          </View>
          <Text style={styles.header}>SYMPTOMS</Text>
          <Text style={styles.content}>{this.state.symptoms}</Text>
          <Text style={styles.header}>MANAGEMENT</Text>
          <Text style={styles.content}>{this.state.management}</Text>
          <Text style={styles.header}>MEDICATION</Text>
          <Text style={styles.content}>{this.state.medications}</Text>
          <Text style={styles.header}>REFERENCES</Text>
          <Text style={styles.content}>{this.state.references}</Text>
          
        </ScrollView>
      ) 
    }
    return (
      <View style={styles.screen}>
        <Text style={styles.header}>Loading...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    padding:20,
    flex: 1
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    width: 250,
    borderBottomColor: 'black',
    textAlign: 'center',
    color: 'red',
    paddingBottom: 10,
    paddingLeft: 50
  },
  content: {
    paddingBottom: 15
  }
});

FilterScreen.navigationOptions = navigationdata => {
  const subcatid = navigationdata.navigation.getParam('subcategoryId');
  const subCat = SUBCATEGORIES.find(cat => cat.id === subcatid)
   return{
   headerTitle: subCat.title,
   headerStyle: {
     backgroundColor: 'white',
   }
 }
 }



/*
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import {CONTENT} from '../data/categoriesData';



const CatContent = props => {


  const SubcatId = props.navigation.getParam('SubCategoryId');

  const displayContent = CONTENT.filter(con => con.id.indexOf(SubcatId) >= 0);



  const renederGridItem = (itemData) => { 
    return (
      <View>
      <Text>{itemData.item.evaluation}</Text>
      <Text> </Text>
      <Text>{itemData.item.signs}</Text>
      <Text></Text>
      <Text>{itemData.item.management}</Text>
      <Text>{itemData.item.medications}</Text>
      <Text>{itemData.item.references}</Text>
      </View>
    )
  }


  return (
    <View style={styles.screen}>
      <Text>category content!</Text>
      <Text>more content will be added soon...</Text>
      <Text>{SubcatId}</Text>
      <FlatList data = {displayContent} renderItem ={renederGridItem}/>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CatContent;
*/