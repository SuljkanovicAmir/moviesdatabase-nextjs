import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirebaseConfig } from './firebase.config';
import { initializeApp } from 'firebase/app';

const app = initializeApp(getFirebaseConfig());
export const auth = getAuth(app);

