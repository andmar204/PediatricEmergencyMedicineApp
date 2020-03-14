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
