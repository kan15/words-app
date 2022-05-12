import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { Translation, Word } from "../types/types";
import { getPronunciation } from "./apiDictionary";

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

  addItem(newWord: Translation): Promise<void> {
    const newWordKey = firebase.database().ref().child("words").push().key;
    //Here I want to add the pronunciation and add it to the database along with the data from the user.
    return getPronunciation(newWord.eng)
      .then((pronunciation) => {
        return { [`/words/${newWordKey}`]: { ...newWord, ...pronunciation } };
      })
      .then((updates) => {
        firebase.database().ref().update(updates);
      });
  },

  updateItem(newWord: Word): Promise<void> {
    const adaNameRef = firebase.database().ref(`words/${newWord.key}`);
    return adaNameRef.update({ eng: newWord.eng, rus: newWord.rus });
  },

  deleteItem(word: Word) {
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
