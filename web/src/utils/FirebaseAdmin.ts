import firebaseConfig from './FirebaseConfig.json';
import firebaseAdmin from 'firebase-admin';

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp(firebaseConfig);
}

export { firebaseAdmin };
