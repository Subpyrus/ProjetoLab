import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyArZDj6th_d5a_eNVzNh3o2Qa8a-hfz_K0",
    authDomain: "my-pokemon-project-aa51f.firebaseapp.com",
    databaseURL: "https://my-pokemon-project-aa51f.firebaseio.com",
    projectId: "my-pokemon-project-aa51f",
    storageBucket: "my-pokemon-project-aa51f.appspot.com",
    messagingSenderId: "689056309500",
    appId: "1:689056309500:web:3e193397afbc39624b7779",
    measurementId: "G-07R5JMZ72F",
    userProfile: "users",
    useFirestoreForProfile: true,
    attachAuthIsReady: true
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore()

export default firebase;