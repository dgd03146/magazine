import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB3K5_c-QYPw_l3iRLTCBprsVrZimUMVBg',
  authDomain: 'football-magazine-55150.firebaseapp.com',
  projectId: 'football-magazine-55150',
  storageBucket: 'football-magazine-55150.appspot.com',
  messagingSenderId: '928418737891',
  appId: '1:928418737891:web:33db56d8987532962adfd6',
  measurementId: 'G-6S88NGL21W'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const apiKey = firebaseConfig.apiKey;
export default app;
