import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB-8jBI6sXv-olCTWlMeWZAsRCYJHCVVnk",
  authDomain: "appotter-733e3.firebaseapp.com",
  projectId: "appotter-733e3",
  storageBucket: "appotter-733e3.firebasestorage.app",
  messagingSenderId: "863392160328",
  appId: "1:863392160328:web:d03d5fa9a66e58c0d9567d"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };