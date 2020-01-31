import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC7THmTy5jrNwAW_BBk1xtQBLCqKzmY9TM",
  authDomain: "pemapp-9eba9.firebaseapp.com",
  databaseURL: "https://pemapp-9eba9.firebaseio.com",
  projectId: "pemapp-9eba9",
  storageBucket: "pemapp-9eba9.appspot.com",
};


var Firebase =  firebase.initializeApp(firebaseConfig);
export default Firebase