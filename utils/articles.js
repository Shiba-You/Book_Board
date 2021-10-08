import { db } from '../pages/api/firebase';

export const getAllArticles = (currentUser, setArticles) => {
  const docRef = db.collection('version/1/articles')
  docRef
    .where('user_uid', '==', currentUser.uid)
    .get()
    .then(snapshot => {
      let docs = [];
      snapshot.forEach(doc => {
        docs.push(Object.assign(doc.data(), {uid: doc.id}))
      });
      setArticles(docs);
    })
};

export const getArticle = (uid, setArticle) => {
  const docRef = db.collection('version/1/articles')
  docRef
    .doc(uid)
    .get()
    .then(doc => {
      // console.log(doc.data())
      setArticle(doc.data());
    });
};

