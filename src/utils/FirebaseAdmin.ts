import firebaseConfig from './FirebaseConfig';
import firebaseAdmin from 'firebase-admin';

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp(firebaseConfig);
}

export { firebaseAdmin };
