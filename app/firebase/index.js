import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from './firebase.config';
import { getFirestore} from "firebase/firestore";



   const app = initializeApp(getFirebaseConfig());
   const  db = getFirestore(app);



export { app, db }