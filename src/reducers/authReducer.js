
import {SIGN_IN, SIGN_OUT} from "../actions/type"
import {INITIAL_STATE} from "./initialState"

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN: return {...state, isSignedIn: true,  userId: action.payload};
        case SIGN_OUT: return {...state, isSignedIn: false,  userId: null};
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