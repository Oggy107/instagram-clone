import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyC1jB5EwIqtDooXtQqgE8tamKYvsjySD94",
  authDomain: "rn-instagram-clone-9b57f.firebaseapp.com",
  projectId: "rn-instagram-clone-9b57f",
  storageBucket: "rn-instagram-clone-9b57f.appspot.com",
  messagingSenderId: "195243871957",
  appId: "1:195243871957:web:9dc74051986974bec8dc5c"
};

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = firebase.firestore()

export {firebase, db}