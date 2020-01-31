import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC7THmTy5jrNwAW_BBk1xtQBLCqKzmY9TM",
  authDomain: "pemapp-9eba9.firebaseapp.com",
  databaseURL: "https://pemapp-9eba9.firebaseio.com",
  storageBucket: "pemapp-9eba9.appspot.com",
};

firebase.initializeApp(firebaseConfig);

var db = firebase.database();