import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { config } from "./firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  if (process.env.NODE_ENV === "development") {
    firebase.auth().useEmulator("http://localhost:9099");
    firebase.database().useEmulator("localhost", 9000);
  }
}
