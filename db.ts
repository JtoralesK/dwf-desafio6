import admin from"firebase-admin"
import * as serviceAccount from"./firebase.json"


admin.initializeApp({
    credential:  admin.credential.cert(serviceAccount as any),
    databaseURL: 'https://apx-dwf-m6-cfe90-default-rtdb.firebaseio.com'
});
const firestore = admin.firestore()
const rtdb = admin.database()
export {firestore,rtdb}