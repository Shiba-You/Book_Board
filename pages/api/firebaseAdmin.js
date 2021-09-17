import admin from "firebase-admin";

const serviceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_projectId,
  clientEmail: process.env.NEXT_PUBLIC_FIREBASE_clientEmail,
  privateKey: (process.env.NEXT_PUBLIC_FIREBASE_privateKey || "").replace(
    /\\n/g,
    "\n"
  ),
};

/**
 * @description
 * @note
 */
export const firebaseAdmin =
  admin.apps[0] ||
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });