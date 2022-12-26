import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC5lrF4RuzxJdObqPPTHJibz9u5ISxFjnk",
  authDomain: "mini-blog-eb74a.firebaseapp.com",
  projectId: "mini-blog-eb74a",
  storageBucket: "mini-blog-eb74a.appspot.com",
  messagingSenderId: "99548978795",
  appId: "1:99548978795:web:8b30ecbf0d25c2e6629b2e",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
