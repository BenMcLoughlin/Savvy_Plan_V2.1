import {SIGN_IN, SIGN_OUT} from "./type"

export const setVariable = (event) => {
    switch(event.target.name) {
        case("currentAge"): 
            return {
                type: "SET_CURRENT_AGE", 
                payload: event.target.value
            }
        case("retirementAge"): 
            return {
                type: "SET_RETIREMENT_AGE", 
                payload: event.target.value
            }
        case("lifeSpan"): 
            return {
                type: "SET_LIFESPAN", 
                payload: event.target.value
            }
        default: return null
    }
}

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId,
    }
}
export const signOut = () => {
    return {
        type: SIGN_OUT,
    }
}