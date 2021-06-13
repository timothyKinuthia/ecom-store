/* eslint-disable import/no-anonymous-default-export */
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCJ_zS2Bst_B13o9vnxCmRGRupEbMGdarE",
    authDomain: "project1-eadb3.firebaseapp.com",
    databaseURL: "https://project1-eadb3.firebaseio.com",
    projectId: "project1-eadb3",
    storageBucket: "project1-eadb3.appspot.com",
    messagingSenderId: "74485578610",
    appId: "1:74485578610:web:455e695a9fd7e097eb7beb"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

