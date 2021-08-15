import firebase from 'firebase'

let firebaseConfig = {
    apiKey: "AIzaSyADEKUFv4H9TjJlfcgJPwo8PRyXM22W3Nc",
    authDomain: "chat-app-e8980.firebaseapp.com",
    projectId: "chat-app-e8980",
    storageBucket: "chat-app-e8980.appspot.com",
    messagingSenderId: "248702459070",
    appId: "1:248702459070:web:dbcc8a48089f53551b12ef"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth }