import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Category from './Category.js';

export default function Home(props) {
  return (
    <View style={styles.container}>
      <Category style={[styles.button, styles.leftCategory, styles.topCategory]} text="Medical" nav={props.navigation}/>
      <Category style={[styles.button, styles.rightCategory, styles.topCategory]} text="Surgical" nav={props.navigation}/>
      <Category style={[styles.button, styles.leftCategory, styles.topMidCategory]} text="Trauma " nav={props.navigation}/>
      <Category style={[styles.button, styles.rightCategory, styles.topMidCategory]} text="Toxicology" nav={props.navigation}/>
      <Category style={[styles.button, styles.leftCategory, styles.botMidCategory]} text="Foreign Ingestion" nav={props.navigation}/>
      <Category style={[styles.button, styles.rightCategory, styles.botMidCategory]} text="Emergent Rashes Algorithm" nav={props.navigation}/>
      <Category style={[styles.button, styles.leftCategory, styles.bottomCategory]} text="Search" nav={props.navigation}/>
      <Category style={[styles.button, styles.rightCategory, styles.bottomCategory]} text="Chatroom" nav={props.navigation}/>
    </View>
  );
}
const thirdScreenWidth = Math.round((Dimensions.get('window').width)/3);
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ddd',
    padding: 10,
    height: thirdScreenWidth,
    width: thirdScreenWidth,
    position: "absolute"
  },
  leftCategory: {
    left: thirdScreenWidth/3
  },
  rightCategory: {
    right: thirdScreenWidth/3
  },
  topCategory: {
    top: screenHeight/10
  },
  topMidCategory: {
    top: screenHeight/3.25
  },
  botMidCategory: {
    top: (2 * screenHeight/3.25) - (screenHeight/10)
  },
  bottomCategory: {
    top: (3 * screenHeight/3.25) - (2 * screenHeight/10)
  }
});
