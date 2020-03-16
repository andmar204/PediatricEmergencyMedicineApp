import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Firebase from '../backend/firebase'

export default class CME extends Component {
  render() {
    return (
      <View>
          <Text>CME SCREEN IS HERE!</Text>
      </View>
    );
  }
}