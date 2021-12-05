import { timestamp } from '../pages/api/firebase';

export const makeRnd = (N) => {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let rand_str = '';
  for ( var i = 0; i < N; i++ ) {
    rand_str += chars.charAt(Math.floor(Math.random() * chars.length));
  };
  return rand_str
};

export const timestampToTime = (timestamp) => {
  if (!timestamp) return
  const date = timestamp.toDate();
  const yyyy = `${date.getFullYear()}`;
  const MM = `0${date.getMonth() + 1}`.slice(-2);
  const dd = `0${date.getDate()}`.slice(-2);
  const HH = `0${date.getHours()}`.slice(-2);
  const mm = `0${date.getMinutes()}`.slice(-2);
  const ss = `0${date.getSeconds()}`.slice(-2);

  return `${yyyy}/${MM}/${dd} ${HH}:${mm}:${ss}`;
};

export const isObjEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const firebaseTimeToDate = (obj) => {
  return new Date(obj.updateAt.seconds*1e3  + obj.updateAt.nanoseconds/1e5)
};

export const biSplit = (word) => {
  let i = 0;
  const splitedWord = [];
  if (word.length <= 1) {
    return word;
  }
  while (i < word.length - 1) {
    splitedWord.push(word.slice(i, i + 2));
    i++;
  }
  return splitedWord;
};