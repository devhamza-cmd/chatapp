// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,createUserWithEmailAndPassword} from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK-D6tAUWZ7lpcu7v3iGrKC4PzDQCBER4",
  authDomain: "chatapp-2301d.firebaseapp.com",
  projectId: "chatapp-2301d",
  storageBucket: "chatapp-2301d.appspot.com",
  messagingSenderId: "779273668887",
  appId: "1:779273668887:web:eb088fd447dabd2b3fcf52",
  measurementId: "G-6QB7Y60EP9"
};
//create user

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
const storage = getStorage();
const db=getFirestore();
export {auth,provider,storage,db};