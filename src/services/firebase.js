import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3btsTiusBVVsGpTkgziMYq9uMeXvfe2M",
  authDomain: "cart-react-31fb4.firebaseapp.com",
  projectId: "cart-react-31fb4",
  storageBucket: "cart-react-31fb4.appspot.com",
  messagingSenderId: "895662749639",
  appId: "1:895662749639:web:29b5d4f2432802e01c4be2",
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
