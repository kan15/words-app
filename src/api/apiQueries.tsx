import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { Translation, Word } from "../types/types";

const firebaseConfig = {
    apiKey: "AIzaSyBr1PLF6Zdq_k2eLlR3HlgUApNGejrBNIA",
    authDomain: "english-vocabulary-react.firebaseapp.com",
    databaseURL: "https://english-vocabulary-react-default-rtdb.firebaseio.com",
    projectId: "english-vocabulary-react",
    storageBucket: "english-vocabulary-react.appspot.com",
    messagingSenderId: "281598012164",
    appId: "1:281598012164:web:7e8ed5899b5cf80bf8fe51",
};
firebase.initializeApp(firebaseConfig);

const errData = (error: string) => {
    console.log("Error!", error);
};

const listWords = () => {
    const database = firebase.database();
    return database.ref("words");
};

const mapWordsList = (data: firebase.database.DataSnapshot) => {
    const serverData = data.val();
    return Object.keys(serverData).map((key) => {
        const translation = serverData[key] as Translation;
        return {
            ...translation,
            key,
        } as Word;
    });
};

const apiQueries = {
    getData(): Promise<Word[]> {
        return new Promise((resolve, reject) => {
            listWords().on(
                "value",
                (data) => {
                    const words: Word[] = mapWordsList(data);
                    return resolve(words);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    },

    addItem(newWord: Translation) {
        const newWordKey = firebase.database().ref().child("words").push().key;
        const updates: { [index: string]: {} } = {};
        updates[`/words/${newWordKey}`] = newWord;
        return firebase.database().ref().update(updates);
    },

    updateItem(newWord: Word) {
        const adaNameRef = firebase.database().ref(`words/${newWord.key}`);
        adaNameRef.update({ eng: newWord.eng, rus: newWord.rus });
    },

    deleteItem(word: Word) {
        console.log(word.key);
        const adaRef = firebase.database().ref(`words/${word.key}`);
        adaRef
            .remove()
            .then(function () {
                console.log("Remove succeeded.");
            })
            .catch(function (error) {
                console.log(`Remove failed: ${error.message}`);
            });
    },
};

export default apiQueries;
