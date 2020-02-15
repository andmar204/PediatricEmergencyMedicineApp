const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.heyWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Function!");
// });

// const createMessage = (message => {
//     return admin.firestore().collection('messages')
//         .add(message)
//         .then(doc => console.log('Message added: ', doc))
// })

/*exports.updateMessages = functions.firestore.document('messages/{message}').onCreate(doc => {
    console.log('Message added: ', doc.data())
})*/
