import { initializeApp } from 'firebase/app';
import firebaseConfig from './FirebaseConfig';

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
