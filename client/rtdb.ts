import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";
const firebaseConfig = {
    apiKey: "7VHMNBmEBfS0LNpCffZYilr5zjrjORbhf8xlotTu",
    databaseURL: "https://apx-dwf-m6-cfe90-default-rtdb.firebaseio.com",
    authDomain: "apx-dwf-m6-cfe90.firebaseapp.com",
  };
  const app = initializeApp(firebaseConfig);
  const rtdb = getDatabase(app);
  export {rtdb}