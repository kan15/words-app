import firebase from "firebase/compat/app";

export const firebaseConfig = {
  apiKey: "AIzaSyBr1PLF6Zdq_k2eLlR3HlgUApNGejrBNIA",
  authDomain: "english-vocabulary-react.firebaseapp.com",
  databaseURL: "https://english-vocabulary-react-default-rtdb.firebaseio.com",
  projectId: "english-vocabulary-react",
  storageBucket: "english-vocabulary-react.appspot.com",
  messagingSenderId: "281598012164",
  appId: "1:281598012164:web:7e8ed5899b5cf80bf8fe51",
};
firebase.initializeApp(firebaseConfig);

export const urlDictionary = "https://api.dictionaryapi.dev/api/v2/entries/en/";
