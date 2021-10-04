import { resolveHref } from 'next/dist/shared/lib/router/router';
import { db, storage } from '../pages/api/firebase';
import { makeRnd } from './main';

export const saveImage = async (currentUser, image, imageTag) => {
  if (image === "") {
    // TODO エラー処理
    alert("サムネイルが選択されていません")
    return;
  }
  const imageBase64 = image.replace(/[\s\S]*base64\,/ , "");
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
  })
};