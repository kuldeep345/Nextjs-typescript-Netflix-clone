import { initializeApp , getApp , getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCc-FjXXz6uMVsPsjCMlsjf3kW1JUIfjV4",
  authDomain: "netflix-clone-27d6c.firebaseapp.com",
  projectId: "netflix-clone-27d6c",
  storageBucket: "netflix-clone-27d6c.appspot.com",
  messagingSenderId: "910343570258",
  appId: "1:910343570258:web:d816523418fa079b4fb08b"
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const auth = getAuth()

export default app 
export { auth , db }