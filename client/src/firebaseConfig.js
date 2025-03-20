import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSSaJ8GHDsfBvNTKNspFQ5XCMXd1GhIUM",
  authDomain: "interndekho-d49ae.firebaseapp.com",
  projectId: "interndekho-d49ae",
  storageBucket: "interndekho-d49ae.firebasestorage.app",
  messagingSenderId: "605946726910",
  appId: "1:605946726910:web:f0f9bb90f5625d40a6d8af"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db  ,app};