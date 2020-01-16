const initialState = {
    authError: null, 
}

const authReducer = (state = initialState, action) => {
       switch(action.type) {
            case "LOGIN_FAILURE": 
            console.log('login error');
            return {
                ...state, 
                authError: "Login failed"
    }
           case "LOGIN_SUCCESS": 
           console.log('login success');
           return {...state,
                authError: null, 
                email: action.email, 
                password: action.password}  
                
           case "SIGN_OUT_SUCESS": 
                console.log('sign out success');
           case "SIGN_UP_SUCESS": 
                console.log('sign up success');
                return {...state, authError: null}
           case "SIGN_UP_FAILURE": 
                console.log('sign up error');
                return {
                    ...state, 
                    authError: action.error.message
        }

       default: return state
            }
}

export default authReducer