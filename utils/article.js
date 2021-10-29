import { db, storage } from '../pages/api/firebase';
import { makeRnd } from './main';
import { alertAndRedirect } from './info';

// ログインユーザーのArticle一覧を取得
export const getArticles = (currentUser, setArticles, pageDif) => {
  const difAndOrder = getQueryParam(pageDif)
  const docRef = db.collection('version/1/articles')
  docRef
    .where('user_uid', '==', currentUser.uid)
    .orderBy("updateAt", difAndOrder[1])
    .limit(3*difAndOrder[0])       // TODO: 取得数を動的に変化 getArticlesCount と同期させる
    .get()
    .then(snapshot => {
      let docs = [];
      let idx = 0;
      console.log(pageDif, difAndOrder)
      snapshot.forEach(doc => {
        idx += 1
        if (idx > 3*(difAndOrder[0]-1)) {
          if (difAndOrder[1] == "desc") {
            docs.push(Object.assign(doc.data(), {uid: doc.id}))
          } else if (difAndOrder[1] == "asc") {
            docs.unshift(Object.assign(doc.data(), {uid: doc.id}))
          }
        }
      });
      localStorage.setItem('uid', JSON.stringify({"fuid": docs[0]["uid"], "luid": docs.slice(-1)[0]["uid"]}))
      setArticles(docs);
    })
};

// Articleの長さ取得
export const getArticlesCount = (currentUser, setArticlesCount) => {
  const docRef = db.collection('version/1/users')
  docRef
    .doc(currentUser.uid)
    .get()
    .then(doc => {
      setArticlesCount(Math.ceil(doc.data().articleCount/3))    // TODO: 取得数を動的に変化 getArticles と同期させる
    })
};

// 単体Articleの詳細を取得
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

// Article画像の保存
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

// Articleの保存
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

// Articleの編集
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

// page移動に伴うパラメータの変更
const getQueryParam = (pageDif) => {
  if (pageDif == 0) {
    return [1, "desc"]
  } else if (pageDif < 0) {
    return [Math.abs(pageDif), "asc"]
  } else {
    return [pageDif, "desc"]
  }
}