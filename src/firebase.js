import firebase from 'firebase';
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBghBfyVy03q8EiKSKc8y-780cMOeVN4IA",
    authDomain: "catchooser.firebaseapp.com",
    databaseURL: "https://catchooser.firebaseio.com",
    projectId: "catchooser",
    storageBucket: "catchooser.appspot.com",
    messagingSenderId: "784568714919",
    appId: "1:784568714919:web:9b4ebc9e26bc757f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;