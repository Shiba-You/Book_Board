import { db, timestamp, storage } from '../pages/api/firebase';
import { makeRnd, firebaseTimeToDate, biSplit } from './main';
import { alertAndRedirect } from './info';

// ログインユーザーのArticle一覧を取得
export const getArticles = async (currentUser, page, articleCount, searchWord) => {
  const articleRef = db.collection('version/1/articles');
  let currentUserArticleRef = articleRef.where('user_uid', '==', currentUser.uid)

  const limit = page * articleCount;
  const docs = []
  let limitIndex = 0

  // 検索する際は searchWord を参照する
  if (searchWord) {
    const spliteSearchdWord = biSplit(searchWord)
    spliteSearchdWord.forEach((word) => {
      currentUserArticleRef = currentUserArticleRef.where(`splitedTitle.${word}`, "==", true)
    })
  } else {
    currentUserArticleRef = currentUserArticleRef.orderBy("updateAt", "desc").limit(limit)
  }

  const snapshot = await currentUserArticleRef.get()

  snapshot.forEach(doc => {
    limitIndex += 1
    if (limitIndex > (page - 1) * articleCount) {
      docs.push({...doc.data(), uid: doc.id})
    }
  });

  return docs;
};

// Articleの長さ取得
export const getPageCount = async (currentUser, size) => {
  const userRef = db.collection('version/1/users')

  const snapshot = await userRef
    .doc(currentUser.uid)
    .get();

  const { articleCount } = snapshot.data();
  
  return Math.ceil(articleCount / size)
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
