import { db, storage } from '../pages/api/firebase';
import { makeRnd } from './main';
import { alertAndRedirect } from './info';

export const getAllArticles = (currentUser, setArticles) => {
  const docRef = db.collection('version/1/articles')
  docRef
    .where('user_uid', '==', currentUser.uid)
    .orderBy("updateAt", "desc")
    .get()
    .then(snapshot => {
      let docs = [];
      snapshot.forEach(doc => {
        docs.push(Object.assign(doc.data(), {uid: doc.id}))
      });
      setArticles(docs);
    })
};

export const getArticle = (uid, setArticleTitle, setThumbanil, setContent) => {
  const docRef = db.collection('version/1/articles')
  docRef
    .doc(uid)
    .get()
    .then(doc => {
      setArticleTitle(doc.data().title);
      setThumbanil(doc.data().thumbanil);
      setContent(doc.data().content);
    });
};

export const saveImage = async (currentUser, image, imageTag) => {
  if (image === '') {
    // TODO エラー処理
    alert('サムネイルが選択されていません')
    return;
  }
  const imageBase64 = image.replace(/[\s\S]*base64\,/ , '');
  const storageRef = storage.ref(`images/${currentUser.uid}/`);
  const imagesRef = storageRef.child(imageTag);

  return await new Promise((res) => {
    imagesRef.putString(imageBase64, 'base64', {contentType:'image/jpg'})
    .then(snapshot => {
      snapshot.ref.getDownloadURL()
        .then(downloadURL => {
          res(downloadURL)
        })
    })
  })
};

export const saveArticle = (title, content, currentUser, image) => {
  const imageTag = makeRnd(16)
  saveImage(currentUser, image, imageTag).then(storageUrl => {
    db.collection('version/1/articles')
      .doc()
      .set({
        thumbanil: storageUrl,
        title: title,
        user_uid: currentUser.uid,
        content: content,
        createAt: new Date(),
        updateAt: new Date()
      });
  }).then(() => {
    const msg = '新規作成'
    alertAndRedirect(msg, '/mypage')
  })
};

export const editArticle = (articleUid, title, content, currentUser, image) => {
  const imageTag = makeRnd(16)
  if (~image.indexOf('firebasestorage')) {
    db.collection('version/1/articles')
      .doc(articleUid)
      .update({
        title: title,
        content: content,
        updateAt: new Date()
      }).then(() => {
        const msg = '更新'
        alertAndRedirect(msg, `/articles/${articleUid}`)
      })
  } else {
    saveImage(currentUser, image, imageTag).then(storageUrl => {
      db.collection('version/1/articles')
        .doc(articleUid)
        .update({
          thumbanil: storageUrl,
          title: title,
          content: content,
          updateAt: new Date()
        });
    }).then(() => {
      const msg = '更新'
      alertAndRedirect(msg, `/articles/${articleUid}`)
    })
  }
};