import _ from "lodash"

const initialState = () => {
    const lifeEvents = {}
    for (let i = 18; i <= 75; i++) {
        lifeEvents[Number(i)] = {
                    age: i, 
                    name: "",
                    cost: 0,
                    position: true,
        }}
return lifeEvents
}

const lifeEvents_reducer = (state = initialState(), action) => {
    switch(action.type) {
        case "SET_KEY_VARIABLE": 
        return {...state, [action.name]: action.value}        
        case "lifeEvents_reducer/ADD_LIFE_EVENT": 
        return {...state, [action.event.age]: action.event  }

        default: return state
    }
}

export default lifeEvents_reducer

