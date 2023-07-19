const _lastRegex = /[\s][\w\W]{1,3}[\s]*$/g;
const _firstRegex = /\w*\W*$|[\s]?[\w\W]{1,3}[\s]$/g;
let _wordsSize: number | undefined;
let _max: number | undefined;

export const lnWords = (
  words: unknown,
  max = 22
): string | null | undefined => {
  _max = max;

  const allWords = cropWords(words as string);

  if (allWords && _wordsSize && _wordsSize > _max) {
    const lastWord = allWords.match(_firstRegex);

    const response = lastWord && firstFilter(allWords, lastWord);

    return `${response}...`;
  }
  return allWords;
};

const lastFilter = (allWords: string): string | null => {
  const word = allWords.match(_lastRegex);
  if (word) {
    const regex = new RegExp(word[0]);
    const response = allWords.replace(regex, '');
    return `${response}...`;
  }
  return null;
};

const cropWords = (words: string) => {
  if (!words) {
    return;
  }
  _wordsSize = words.length;
  return _max && _wordsSize > _max ? words.slice(0, _max) : words;
};

const firstFilter = (allWords: string, word: string[]) => {
  const regex = new RegExp(word[0]);
  return allWords.replace(regex, '');
};
