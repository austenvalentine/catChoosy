import firebase from 'firebase';

// Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBYsEN6Nm9qfJBF4ShgwTE0t7Of95NvTX4",
        authDomain: "catchooser-ea0bd.firebaseapp.com",
        databaseURL: "https://catchooser-ea0bd.firebaseio.com",
        projectId: "catchooser-ea0bd",
        storageBucket: "catchooser-ea0bd.appspot.com",
        messagingSenderId: "227460058142",
        appId: "1:227460058142:web:c40b69b8190ed3ca"
    };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;