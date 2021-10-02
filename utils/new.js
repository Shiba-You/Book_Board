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

  await imagesRef.putString(imageBase64, 'base64', {contentType:'image/jpg'})
    .then(function (snapshot) {
      snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log(downloadURL)
        return downloadURL
      })
    })
};

export const saveArticle = async (title, content, currentUser, image) => {
  const imageTag = makeRnd(16)
  await saveImage(currentUser, image, imageTag).then(val => {
    console.log("val")
    console.log(val)
  })
  await db
    .collection('version/1/articles')
    .doc(currentUser.uid)
    .set({
      thumbanil: image,
      title: title,
      user_uid: currentUser.uid,
      content: content,
      createAt: new Date(),
      updateAt: new Date()
    });
};