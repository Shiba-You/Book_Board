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

// export const getAllArticlesUid = async ( res ) => {
//   const docRef = db.collection('version/1/articles')
//   await docRef
//     .get()
//     .then(docs => {
//       let docs_uid = [];
//       docs.forEach(doc => {
//         docs_uid.push(doc.id)
//       });
//       console.log(docs_uid)
//       res(docs_uid);
//     })
// };

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

