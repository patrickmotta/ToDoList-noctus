import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyA4nHwN-8ck6xIlT9sGor8_nANoqwOV6j0",
   authDomain: "teste-722ea.firebaseapp.com",
   projectId: "teste-722ea",
   storageBucket: "teste-722ea.appspot.com",
   messagingSenderId: "566248443622",
   appId: "1:566248443622:web:34c08a98d6ed03db857527",
   measurementId: "G-DQS92QFY6L"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;