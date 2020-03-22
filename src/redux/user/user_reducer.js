
const initialState = {
    id: "",
    displayName: "",
    email: "",
    firstName: "",
    province: "",
    spouse: false,
    taxAge: false,
    birthYear: 1978,
    currentAge: 32, 
    rrifWithdrawalAge: 65,
    retirementPensionIncome: 0,
    hasChildren: false,
    numberOfChildren: 0,
    retirementAge: 65, 
    lifeSpan: 95,       
    cppStartAge: 65,
    oasStartAge: 65,
    rrspStartAge: 65,
    tfsaStartAge: 65, 
    rate1: 0.06,
    rate2: 0.045,
    inflationRate: 0.02,
    MER: 0.02,
    propertyAppreciation: 0.03,
}

const user_reducer = (state = initialState, action) => {
    switch(action.type) {  
        case "user_reducer/SET_KEY_VALUE": return {...state, [action.key]: action.value}            
        default: return state
    }
}

export default user_reducer

