import * as firebase from 'firebase'

class Firebase {
  constructor() {
    this.init()
    this.observeAuth()
  }
  /**
   * Initializes Firebase. 
   * The if...else is used so the app won't crash
   * with an error saying "Firebase has already 
   * been initialized." The initialization also runs
   * this.counter() and this.whosOnline() to set those
   * up for when people log in. 
   */
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
      this.whosOnline()
    } else {
      console.error('Firebase app was already initialized!')
    }
  }

  observeAuth = () => {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = user => {
    if (user) {
      //console.log('-----USER:', user.email, '-----')
    } else {
      //console.log('-----NO USER-----')
    }
  }

  /**
   * Initializes the user counter. This is so we know how many people are online.
   */
  counter = () => {
    firebase.database().ref('userCount').once('value').then(function (snapshot) {
      if (snapshot.val() == null) {
        firebase.database().ref('userCount').set({
          count: 0
        })
      }
    })
  }

  /**
   * Initializes onlineUsers, which will be storing a list of the users that are online.
   */
  whosOnline = () => {
    firebase.database().ref('onlineUsers').once('value').then(function (snapshot) {
      if (snapshot.val() == null) {
        firebase.database().ref('onlineUsers').set({
          onlineUsers: 0 //This isn't supposed to be a number, but I can't set it to an 
          //empty array or empty object. So it'll be 0 until it gets set to
          //an object later
        })
      }
    })
  }

  /**
   * Gets the user count. If it's -9999, there's been an error with Firebase
   * getting the count.
   */
  get getUserCount() {
    let count = -9999; //Using this large number to detect if it never changes
    firebase.database().ref('userCount').on('value', function (snapshot) {
      count = snapshot.val().count;
    })
    return count;
  }

  /**
   * Sets the user count. It takes a parameter from screens where users can sign in 
   * and sign out (I think LoginScreen, ChatroomScreen, and SubCategoriesScreen). If 
   * the parameter is 1, that means the user is signing in and the count increments.
   * Otherwise, the user is signing out and the count decrements. 
   */
  set setUserCount(num) {
    firebase.database().ref('userCount').once('value').then(function (snapshot) {
      firebase.database().ref('userCount').set({
        count: num == 1 ? snapshot.val().count + 1 : snapshot.val().count - 1
      })
    })
  }

  /**
   * Gets the list of online users. 
   */
  get getOnlineUsers() {
    let onlineUsers = [];
    firebase.database().ref('onlineUsers').on('value', function (snapshot) {
      onlineUsers = snapshot.val().onlineUsers;
    })
    return onlineUsers;
  }

  /**
   * Adds an online user to the onlineUsers list in Firebase. Since onlineUsers was
   * initialized originally with a value of 0, I have to check for that. If it's 0,
   * set onlineUsers to an array with just the userEmail inside it. Otherwise, 
   * take the current value of onlineUsers, push userEmail onto it, and set onlineUsers
   * to that new array. 
   * @param {string} userEmail 
   */
  addOnlineUser(userEmail) {
    let userArr;
    firebase.database().ref('onlineUsers').once('value').then(function (snapshot) {
      userArr = snapshot.val().onlineUsers
      if (userArr === 0) {
        firebase.database().ref('onlineUsers').set({
          onlineUsers: [userEmail]
        })
      } else {
        userArr = snapshot.val().onlineUsers
        userArr.push(userEmail)
        firebase.database().ref('onlineUsers').set({
          onlineUsers: userArr
        })
      }
    })
  }

  /**
   * Removes a user from the onlineUsers list. Firebase can't store an empty list. If
   * you try to store an empty list, it'll simply store nothing. So the length of 
   * onlineUsers is checked before any removal. If the length is 1, it won't remove,
   * because that will just destroy the list entirely. Instead, it will set onlineUsers
   * to 0. If the length of the list is 2 or more, it will take the array of onlineUsers 
   * and use the filter method to yield the exact same array excluding the element that
   * equals userEmail. That new array becomes the value of onlineUsers. 
   * @param {string} userEmail 
   */
  removeOnlineUser(userEmail) {
    firebase.database().ref('onlineUsers').once('value').then(function (snapshot) {
      if ((snapshot.val().onlineUsers).length === 1) {
        firebase.database().ref('onlineUsers').set({
          onlineUsers: 0
        })
      } else {
        let userArr = snapshot.val().onlineUsers
        userArr = userArr.filter(email => email != userEmail)
        firebase.database().ref('onlineUsers').set({
          onlineUsers: userArr
        })
      }
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

  /**
   * Gets the email of the current user.
   */
  get userEmail() {
    return (firebase.auth().currentUser || {}).email;
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