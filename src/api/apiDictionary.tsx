import { urlDictionary } from "./config";
import { TranscriptionAudio } from "../types/types";

const getAdditionalWordInfo = async (word: string) => {
  const url = `${urlDictionary}${word}`;
  const response = await fetch(url);
  const info = await response.json();
  let phoneticsDataServer: any = [];
  info.forEach((block: any) => {
    phoneticsDataServer.push(block.phonetics);
  });
  phoneticsDataServer = [].concat.apply([], phoneticsDataServer);
  return phoneticsDataServer;
};

const hasNeededPronunciation = <T extends { audio: string }>(object: T) => {
  if (object.audio) {
    const linkParts: string[] = object.audio.split(".");
    const accent: string = linkParts[linkParts.length - 2].slice(-2);
    return accent === "us";
  } else {
    return false;
  }
};
const hasAllProp = <T extends TranscriptionAudio>(object: T) => {
  return object.hasOwnProperty("text") && hasNeededPronunciation(object);
};

const checkAdditionalWordInfo = (variants: [any]): TranscriptionAudio => {
  if (variants.length < 1) {
    return {
      text: "",
      audio: "",
    };
  }
  if (variants.some(hasAllProp)) {
    //The case when there is an object that suits us perfectly
    const { text, audio, ...rest } = variants.filter(hasAllProp)[0];
    return {
      text: text,
      audio: audio,
    };
  } else {
    const textIndex: number = variants.findIndex(
      (item: TranscriptionAudio) => item.text !== ""
    );
    const audioIndex: number = variants.findIndex(
      (item: TranscriptionAudio) => item.audio !== ""
    );
    return {
      text: textIndex === -1 ? "" : variants[textIndex].text,
      audio: audioIndex === -1 ? "" : variants[textIndex].text,
    };
  }
};

export const getPronunciation = async (word: string) => {
  return await getAdditionalWordInfo(word).then((variants) =>
    checkAdditionalWordInfo(variants)
  );
};
