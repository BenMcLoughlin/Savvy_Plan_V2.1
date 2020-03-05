export const addInstance_action = (id, state) =>  ({
    type: "savings/ADD_INSTANCE",
    payload: {
        id,
        ...state,
    }
})

export const savingsValue_action = (id, financialValue, rangeBarValue, {name}) => ({
    type: "savings/CHANGE_VALUE",
    id, 
    name,
    financialValue,
    rangeBarValue
})


export const savingsAge_action = (id, ageType, value) => {
    console.log(ageType);
    return ({
    type: "savings/CHANGE_AGE",
    id, 
    ageType,
    value
})}

export const delete_action = (id) => ({
    type: "savings/DELETE",
    id,
})



