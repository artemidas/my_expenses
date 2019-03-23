import firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
    const config = {
        apiKey: "AIzaSyBcMNrnAtzSZkzQX9Muz3ghDruZzOIIx0Y",
        authDomain: "my-expenses-7cf29.firebaseapp.com",
        databaseURL: "https://my-expenses-7cf29.firebaseio.com",
        projectId: "my-expenses-7cf29",
        storageBucket: "my-expenses-7cf29.appspot.com",
        messagingSenderId: "1033848335616"
    }
    firebase.initializeApp(config)
    firebase.firestore()
}

export default firebase.firestore()
