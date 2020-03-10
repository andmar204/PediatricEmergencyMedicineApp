import * as firebase from 'firebase'

class Firebase {
  constructor() {
    this.init()
    this.observeAuth()
  }
  init = () => {
    if (!firebase.apps.length) {
      const firebaseConfig = {
        apiKey: "AIzaSyC7THmTy5jrNwAW_BBk1xtQBLCqKzmY9TM",
        authDomain: "pemapp-9eba9.firebaseapp.com",
        databaseURL: "https://pemapp-9eba9.firebaseio.com",
        projectId: "pemapp-9eba9",
        storageBucket: "pemapp-9eba9.appspot.com",
      };
      
      firebase.initializeApp(firebaseConfig);
      this.counter()
    } else {
      console.error('Firebase app was already initialized!')
    }
  }

  observeAuth = () => {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = user => {
    if(user){
      console.log('-----USER:',user.email,'-----')
    } else {
      console.log('-----NO USER-----')
    }
  }

  counter = () => {
    firebase.database().ref('userCount').once('value').then(function(snapshot){
      if(snapshot.val() == null){
        firebase.database().ref('userCount').set({
          count: 0
        })
      }
    })
  }
  
  get getUserCount() {
    firebase.database().ref('userCount').once('value').then(function(snapshot){
      console.log('Returning snapshot.val()')
      return snapshot.val();
    })
    console.log('NaN is being returned for getUserCount')
    return NaN;
  }
  
  set setUserCount(num) {
    firebase.database().ref('userCount').once('value').then(function(snapshot){
      console.log('SNAPVAL:',snapshot.val())
      firebase.database().ref('userCount').set({
        count: num == 1 ? snapshot.val().count + 1 : snapshot.val().count - 1
      })
    })
  }

  get ref() {
    return firebase.database().ref('messages')
  }

  on = callback =>
    this.ref
      .limitToLast(50000) //I don't want a limit for messages, so I just
                          //use a really high number, like 50000.
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);

    const message = {
      _id,
      timestamp,
      text,
      user,
    };

    return message;
  }

  off() {
    this.ref.off();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];

      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  append = message => this.ref.push(message);
}

Firebase.shared = new Firebase()
export default Firebase