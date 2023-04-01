import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from './firebase.config';
import { getFirestore} from "firebase/firestore";


let app;
let db;

     app = initializeApp(getFirebaseConfig());
     db = getFirestore(app);



export { app, db }