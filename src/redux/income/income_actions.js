export const addIncome_action = (id, state) => {
    console.log(state);
   return ({
    type: "income/ADD_INCOME",
    payload: {
        id,
        ...state,
    }
})}

export const changeIncome_action = (id, financialValue, rangeBarValue, {name}) => ({
    type: "income/CHANGE_INCOME",
    id, 
    name,
    financialValue,
    rangeBarValue
})
export const changeLabel_action = (id, key, event) => ({
    type: "income/CHANGE_LABEL",
    id, 
    key,
    event
})
export const changeAge_action = (id, ageType, value) => {
    console.log(ageType);
    return ({
    type: "income/CHANGE_AGE",
    id, 
    ageType,
    value
})}

export const delete_action = (id) => ({
    type: "income/DELETE",
    id,
})



