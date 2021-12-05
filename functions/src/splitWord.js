const functions = require("firebase-functions");

const biSplit = (word) => {
  let i = 0;
  const splitedWord = {};
  if (word.length <= 1) {
    return [word];
  }
  while (i < word.length - 1) {
    splitedWord[word.slice(i, i + 2)] = true;
    i++;
  }
  return splitedWord;
};

exports.splitWord = functions.firestore
    .document("version/1/articles/{articleId}")
    .onWrite((change) => {
      const splitedTitle = biSplit(change.after.data().title);
      return change.after.ref.update({
        splitedTitle,
      });
    });
