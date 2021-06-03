import firebase from "firebase/app";
import { config } from "./firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
