const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.countArticlesUsers = functions.firestore
    .document("version/1/articles/{articleId}")
    .onWrite((change) => {
      const userId = change.after.data().user_uid;
      const total = "AJPIsDDGVjX2dcF4JVaSNcbSRPa2";
      const FieldValue = admin.firestore.FieldValue;
      const countsRef = db.collection("version/1/users").doc(userId);
      const countsRefTotal = db.collection("version/1/users").doc(total);
      if (!change.before.exists) {
        return (
          countsRef.update({articleCount: FieldValue.increment(1)}),
          countsRefTotal.update({articleCount: FieldValue.increment(1)})
        );
      } else if (change.before.exists && !change.after.exists) {
        return (
          countsRef.update({articleCount: FieldValue.increment(-1)}),
          countsRefTotal.update({articleCount: FieldValue.increment(1)})
        );
      }
      return;
    });
