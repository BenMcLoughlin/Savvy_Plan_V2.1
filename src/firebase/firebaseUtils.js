import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"


const config = {
    apiKey: "AIzaSyAsUOSpyxBc_VIXjD70AAC5VCv8prBCrzI",
    authDomain: "savvy-plan-dummy.firebaseapp.com",
    databaseURL: "https://savvy-plan-dummy.firebaseio.com",
    projectId: "savvy-plan-dummy",
    storageBucket: "savvy-plan-dummy.appspot.com",
    messagingSenderId: "390934882241",
    appId: "1:390934882241:web:47252cb2bbd678471eb140",
    measurementId: "G-VTZ9TS6LJ5"
  };


  firebase.initializeApp(config)


  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({prompt: "select_account"})

  export const signInWithGoogle = () => {
    auth.signInWithPopup(provider)
  }


export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
    const userRef  = firestore.doc(`users/${userAuth.uid}`)
    const collectionRef = firestore.collection("users")
    const snapShot = await userRef.get()
    const collectionSnapshot = await collectionRef.get()
 
   if(!snapShot.exists) {
     const {displayName, email} = userAuth
     const createdAt = new Date()

     try {
       await userRef.set({
         displayName, 
         email,
         createdAt,
         ...additionalData
       })
     }
     catch(error) {
      console.log('error creating user', error.message);
     }
   }
   return userRef

}

  export default firebase