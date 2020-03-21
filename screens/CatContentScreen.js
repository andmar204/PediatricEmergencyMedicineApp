import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as firebase from 'firebase'
import 'firebase/firestore';

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

  dataPromise = firebase.firestore().collection('data').doc(this.props.navigation.getParam('categoryId')).get()
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
        <View style={styles.screen}>
          <Text style={styles.header}>EVALUATION</Text>
          <Text style={styles.content}>{this.state.evaluation}</Text>
          <Text style={styles.header}>MANAGEMENT</Text>
          <Text style={styles.content}>{this.state.management}</Text>
          <Text style={styles.header}>MEDICATION</Text>
          <Text style={styles.content}>{this.state.medications}</Text>
          <Text style={styles.header}>SYMPTOMS</Text>
          <Text style={styles.content}>{this.state.symptoms}</Text>
          <Text style={styles.header}>REFERENCES</Text>
          <Text style={styles.content}>{this.state.references}</Text>
        </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    width: 250,
    borderBottomColor: 'red',
    textAlign: 'center'
  },
  content: {
    paddingBottom: 15
  }
});