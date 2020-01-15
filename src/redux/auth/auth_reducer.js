const initialState = {
    loginError: null, 
}

const authReducer = (state = initialState, action) => {
       switch(action.type) {
            case "LOGIN_FAILURE": 
            console.log('login error');
            return {
                ...state, 
                loginError: "Login failed"
    }
           case "LOGIN_SUCCESS": 
           console.log('login success');
           return {...state,
                loginError: null, 
                email: action.email, 
                password: action.password}  
                
           case "SIGN_OUT_SUCESS": 
           console.log('sign out success');


       default: return state
            }
}

export default authReducer