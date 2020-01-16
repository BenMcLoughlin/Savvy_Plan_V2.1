export const signIn_action = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password,
        ).then(() => {
            dispatch({type: "LOGIN_SUCCESS"})
        }).catch((error) => {
            dispatch({type: "LOGIN_FAILURE", error})
        })
    }
}

export const signUp_action = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase()
        const firestore = getFirestore()

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password,
        ).then((response) => {
    
            return firestore.collection("users").doc(response.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                uid: response.user.uid,
            })
           
        }).then(() =>  dispatch({type: "SIGN_UP_SUCCESS"}))
          .catch((error) => {
            dispatch({type: "SIGN_UP_FAILURE", error})
        })
    }
}

export const signOut_action = () => {
    return ((dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()
        firebase.auth().signOut().then(() => {
            dispatch({type: "SIGN_OUT_SUCESS"})
        })
    })
}