// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getDatabase} from 'firebase/database';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {  
  apiKey: "AIzaSyAq7jL5PmjzlVTdcZWadSfKtNu4iiRJytk",
  authDomain: "finalmo-1722e.firebaseapp.com",
  databaseURL: "https://finalmo-1722e-default-rtdb.firebaseio.com",
  projectId: "finalmo-1722e",
  storageBucket: "finalmo-1722e.appspot.com",
  messagingSenderId: "416436221592",
  appId: "1:416436221592:web:974aaad762d7bde78502ed",
  measurementId: "G-3J056CWW2Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default authentication = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
