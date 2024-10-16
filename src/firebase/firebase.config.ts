// import * as admin from 'firebase-admin';
// import { ServiceAccount } from 'firebase-admin';

// const serviceAccount: ServiceAccount = {
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//   privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
// };

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// const firebaseConfig = {
//   apiKey: 'AIzaSyBiGP5dDNfxGhHRV7ulUEuTsuXSUJHKxfA',
//   authDomain: 'angular-t-bank.firebaseapp.com',
//   databaseURL:
//     'https://angular-t-bank-default-rtdb.europe-west1.firebasedatabase.app',
//   projectId: 'angular-t-bank',
//   storageBucket: 'angular-t-bank.appspot.com',
//   messagingSenderId: '499978590371',
//   appId: '1:499978590371:web:4fdba18743c4973cc98716',
//   measurementId: 'G-YMVNDD312W',
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
