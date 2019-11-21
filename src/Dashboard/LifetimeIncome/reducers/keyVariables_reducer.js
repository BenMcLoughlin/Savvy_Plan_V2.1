
const initialState = {
    birthYear: 1988,
    fromAge: 18, 
    toAge: 65, 
    futureRRSPValue: 0,
}

const keyVariables_reducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_KEY_VARIABLE": 
        return {...state, [action.name]: action.value}        
        default: return state
    }
}

export default keyVariables_reducer

