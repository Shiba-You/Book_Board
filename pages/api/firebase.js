import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDfCOm0gFJVE5Z_xyVKEsZJbR5sJemV9l4",
  authDomain: "book-board-f3939.firebaseapp.com",
  projectId: "book-board-f3939",
  storageBucket: "book-board-f3939.appspot.com",
  messagingSenderId: "41115291592",
  appId: "1:41115291592:web:90188c2b40ed7677b0fafd",
  measurementId: "G-0RWF8N2ZZL"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
