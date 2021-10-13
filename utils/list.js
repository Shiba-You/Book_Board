import { db, storage } from '../pages/api/firebase';

const getDocRef = (currentUser) => {
  if (currenUser) {
    return db.collection('version/1/articles').where('user_uid', '==', currentUser.uid)
  } else {
    return db.collection('version/1/articles')
  }
}

// 最初のページを取得
export const getFList = () => {

}

// 2つ前のページを取得
export const getPList = () => {

}

// 1つ前のページを取得
export const getPPList = () => {

}

// 現在のページを取得
export const getCList = (currentUser) => {
  const docRef = getDocRef(currentUser)
  docRef
    .orderBy("updateAt", "desc")
    .get()
    .then(snapshot => {
      let docs = [];
      snapshot.forEach(doc => {
        docs.push(Object.assign(doc.data(), {uid: doc.id}))
      });
      setArticles(docs);
    })
}

// 1つ次のページを取得
export const getNList = () => {

}

// 2つ次のページを取得
export const getNNList = () => {

}

// 最後のページを取得
export const getLList = () => {

}


// 表示ページを取得
export const getList = (currentUser, setArticles) => {
  const docRef = getDocRef(currentUser)
  docRef
    .orderBy("updateAt", "desc")
    .limit(150)
    .get()
    .then(snapshot => {
      let docs = [];
      snapshot.forEach(doc => {
        docs.push(Object.assign(doc.data(), {uid: doc.id}))
      });
      setArticles(docs);
    })
}