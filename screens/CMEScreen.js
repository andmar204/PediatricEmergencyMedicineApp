import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Firebase from '../backend/firebase'

let cmes = []

let newCme = {
  newCmeCert: '',
  newCmeExp: ''
}

export default class CME extends Component {
  constructor(props) {
    firebase.database().ref('userCmes/userId:' + firebase.auth().currentUser.uid).once('value').then(function (snapshot) {
      console.log('SNAPSHOT.VAL', snapshot.val())
      cmes = snapshot.val() === null ? [] : snapshot.val().cmes;
    }).catch(function (err) {
      console.log('ERROR GETTING CME DATA:', err)
    })
    super(props)
    this.state = {
      cmes: cmes
    }
    console.log('BEGINNING STATE IS', this.state.cmes)
    this.handleCmeCert = this.handleCmeCert.bind(this)
    this.handleCmeExp = this.handleCmeExp.bind(this)
    this.addCme = this.addCme.bind(this)
    this.renderItem = this.renderItem.bind(this)
  }
  static navigationOptions = {
    title: 'CME',
  };

  handleCmeCert(text) {
    newCme.newCmeCert = text
  }

  handleCmeExp(text) {
    newCme.newCmeExp = text
  }

  isValidDate(userDate) {
    //In this case, "valid" just means "did the user input a date" and "is the date tomorrow or later"
    let expDateMillis = Date.parse(userDate)
    if (expDateMillis === NaN) {
      console.log('RETURNING FIRST FALSE')
      return false
    }
    let today = new Date();
    let todayMillis = Date.parse((today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear())

    if (todayMillis - expDateMillis >= 0) {
      /*
      If todayMillis - expDateMillis >= 0, then that means that the expiration date is either the same day
      or earlier than the current date. I'm not allowing this since expiration dates supposed to be in the
      future.
      */
      console.log('RETURNING SECOND FALSE')
      return false
    }
    console.log('RETURNING TRUE')
    return true
  }

  addCme() {
    console.log('NEWCME:', newCme)
    if (newCme.newCmeCert != '' && this.isValidDate(newCme.newCmeExp)) {
      cmes.push({
        cert: newCme.newCmeCert,
        exp: newCme.newCmeExp
      })

      this.setState({
        cmes: cmes
      })
      console.log('STATE IS', this.state)

      firebase.database().ref('userCmes/userId:' + firebase.auth().currentUser.uid).set({
        cmes: cmes
      }).catch(function (err) {
        console.log('ERROR IN SETTING userCmes/userId:', err)
      })
    } else {
      console.log('One or both of the fields in newCme are empty. We can\'t have that.')
    }
  }

  renderItem(cme) {
    return (
      <Text>{cme.item.cert + ':' + cme.item.exp}</Text>
    )
  }

  render() {
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.header}>CME</Text>
          <Text style={styles.header}>Renewal Date</Text>
        </View>
        <FlatList
          data={this.state.cmes}
          renderItem={(itemData) => (
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.cmeItem}>{itemData.item.cert}</Text>
              <Text style={styles.cmeItem}>{itemData.item.exp}</Text>
            </View>
          )}
          numColumns={1} />
        <View style={{ flexDirection: "row" }}>
          <TextInput style={styles.textField} onChangeText={this.handleCmeCert} placeholder='Certification here' />
          <TextInput style={styles.textField} onChangeText={this.handleCmeExp} placeholder='MM/DD/YYYY' />
        </View>
        <TouchableOpacity
          style={styles.addCmeButton}
          onPress={this.addCme}
        >
          <Text style={styles.text}>Add CME</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  textField: {
    flex: 1,
    fontFamily: 'open-sans-bold',
    height: 60,
    width: '80%',
    textAlign: 'center',
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 30,
    margin: 8
  },
  header: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'open-sans-bold',
    textAlign: 'center',
    alignSelf: 'center',
    width: '80%',
  },
  text: {
    fontFamily: 'open-sans-bold',
    textAlign: 'center'
  },
  addCmeButton: {
    marginTop: 10,
    alignSelf: 'center',
    padding: 10,
    width: 250,
    backgroundColor: '#00ffb8',
    borderRadius: 30,
  },
  cmeItem: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'open-sans-bold',
    textAlign: 'center',
    alignSelf: 'center',
    width: '80%',
  }
})