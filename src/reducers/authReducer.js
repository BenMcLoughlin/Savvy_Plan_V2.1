
export const INITIAL_STATE = {
    isSignedIn: false,
    userID: null,
    currentAge: 20, 
    retirementAge: 65, 
    lifeSpan: 95,
}
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "SIGN_IN": return {...state, isSignedIn: true,  userId: action.payload};
        case "SIGN_OUT": return {...state, isSignedIn: false,  userId: null};
        default:
          return state
    }
}

// export default (state = INITIAL_STATE, action) => {
//     switch(action.type) {
//         case SIGN_IN: return {...state, isSignedIn: true, userId: action.payload}
//         case SIGN_OUT: return {...state, isSignedIn: false, userId: null}
//         default:
//             return state;
//     }

// }

//
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// reducer for enabling a user to sign in and out using Google Auth