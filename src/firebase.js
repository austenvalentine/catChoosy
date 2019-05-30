import firebase from 'firebase';
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCE52F_76Gn_jVGoT8Us-dW6IX_B-tJgIE",
    authDomain: "kitty-curator.firebaseapp.com",
    databaseURL: "https://kitty-curator.firebaseio.com",
    projectId: "kitty-curator",
    storageBucket: "kitty-curator.appspot.com",
    messagingSenderId: "349452374661",
    appId: "1:349452374661:web:5ca058602882b2c1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;