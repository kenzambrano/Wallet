import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyA96WUkAbUwzj4vBWagxWvcZl-o9vVyS3E',
  authDomain: 'wallet-dce29.firebaseapp.com',
  databaseURL: 'https://wallet-dce29.firebaseio.com',
  projectId: 'wallet-dce29',
  storageBucket: 'wallet-dce29.appspot.com',
  messagingSenderId: '855727424362'
}
firebase.database.enableLogging(true)
firebase.initializeApp(config)

export const db = firebase.database()
export const auth = firebase.auth()