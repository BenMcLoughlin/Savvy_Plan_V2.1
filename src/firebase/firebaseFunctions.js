
'use strict';
import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"


// Sign-in With Google
export function signInWithGoogle() {                                          // Sign into Firebase using popup auth & Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}