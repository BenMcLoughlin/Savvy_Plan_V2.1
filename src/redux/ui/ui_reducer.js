import _ from "lodash"

const initialState = { 

   }

 const ui_reducer = (state = initialState, action) => {
    switch(action.type) {
        case "ui_reducer/DELETE": return _.omit(state, [action.id])
        case "ui_reducer/SET_KEY_VALUE": return {...state, [action.key]: action.value}                                 //sets a simple key value pair within the reducer object
        case "ui_reducer/SET_NESTED_KEY_VALUE": return {...state, [action.parentKey]: {
                                                                        ...state[action.parentKey], 
                                                                        [action.childKey]: action.value
}}    
        default: return state
    }
}

export default ui_reducer