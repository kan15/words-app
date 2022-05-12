import { urlDictionary } from "./config";
import { TranscriptionAudio } from "../types/types";

const getAdditionalWordInfo = async (word: string) => {
  const url = `${urlDictionary}${word}`;
  const response = await fetch(url);
  const info = await response.json();
  const phoneticsDataServer: [any] = info
    .map((block: any) => {
      return block.phonetics;
    })
    .flat();
  return phoneticsDataServer;
};

const hasNeededPronunciation = <T extends { audio: string }>(object: T) => {
  if (object.audio) {
    const linkParts: string[] = object.audio.split(".");
    const accent: string = linkParts[linkParts.length - 2].slice(-2);
    return accent === "us";
  }
};

const hasAllProp = <T extends TranscriptionAudio>(object: T) => {
  return object.hasOwnProperty("text") && hasNeededPronunciation(object);
};

const checkAdditionalWordInfo = (variants: [any]): TranscriptionAudio => {
  const itemWithInfo = variants.find(hasAllProp); //The case when there is an object that suits us perfectly
  if (variants.length < 1) {
    return {
      text: "",
      audio: "",
    };
  }
  if (itemWithInfo) {
    const { text, audio, ...rest } = itemWithInfo;
    return {
      text: text,
      audio: audio,
    };
  }

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
};

export const getPronunciation = async (word: string) => {
  return await getAdditionalWordInfo(word).then((variants) =>
    checkAdditionalWordInfo(variants)
  );
};
