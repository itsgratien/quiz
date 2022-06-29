import { initializeApp } from 'firebase/app';
import firebaseConfig from './FirebaseConfig.json';

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
