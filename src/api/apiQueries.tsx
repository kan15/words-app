import firebase from "firebase/compat/app";
import "firebase/compat/database";
// import { initializeApp } from "firebase/app";
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

type TranscriptionAudio = {
  text?: string;
  audio?: string;
};

const getAdditionalWordInfo = async (word: string) => {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const response = await fetch(url);
  const info = await response.json();
  let phoneticsDataServer: any = [];
  info.forEach((block: any) => {
    phoneticsDataServer.push(block.phonetics);
    phoneticsDataServer = [].concat.apply([], phoneticsDataServer);
  });
  return phoneticsDataServer;
};

const getPronunciation = (word: string): TranscriptionAudio => {
  let transcriptionAudio: TranscriptionAudio;

  const hasNeededPronunciation = (object: any) => {
    if (object.audio) {
      const linkParts: string[] = object.audio.split(".");
      // const accent: string = linkParts.at(-2).slice(-2); // TODO: 'at' doesn't work with typescript. 'at' does not exist on type 'string[]'.
      const accent: string = linkParts[linkParts.length - 2].slice(-2);
      return accent === "us";
    } else {
      return false;
    }
  };
  const hasAllProp = (object: any) => {
    return object.hasOwnProperty("text") && hasNeededPronunciation(object);
  };
  getAdditionalWordInfo(word).then((variants) => {
    if (variants.length === 0) {
      return (transcriptionAudio = {
        text: "",
        audio: "",
      });
    } else {
      if (variants.some(hasAllProp)) {
        //The case when there is an object that suits us perfectly
        const { text, audio, ...rest } = variants.filter(hasAllProp)[0];
        return (transcriptionAudio = {
          text: text,
          audio: audio,
        });
      } else {
        const textIndex: number = variants.findIndex(
          (item: TranscriptionAudio) => item.text !== ""
        );
        const audioIndex: number = variants.findIndex(
          (item: TranscriptionAudio) => item.audio !== ""
        );
        return (transcriptionAudio = {
          text: textIndex === -1 ? "" : variants[textIndex].text,
          audio: audioIndex === -1 ? "" : variants[textIndex].text,
        });
      }
    }
  });
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
    const updates: { [index: string]: {} } = {};
    //Here I want to add the pronunciation and add it to the database along with the data from the user.
    const pronunciation = getPronunciation(newWord.eng);
    console.log(pronunciation);
    updates[`/words/${newWordKey}`] = newWord;
    return firebase.database().ref().update(updates);
  },

  updateItem(newWord: Word): Promise<void> {
    const adaNameRef = firebase.database().ref(`words/${newWord.key}`);
    return adaNameRef.update({ eng: newWord.eng, rus: newWord.rus });
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
