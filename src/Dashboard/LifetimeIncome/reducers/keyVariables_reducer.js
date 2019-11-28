
const initialState = {
    birthYear: 1988,
}

const keyVariables_reducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_KEY_VARIABLE": 
        return {...state, [action.name]: action.value}        
        default: return state
    }
}

export default keyVariables_reducer

