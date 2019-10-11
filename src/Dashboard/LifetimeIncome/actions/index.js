
export const setIncome = (selectedAge, name, financialValue, rangeBarValue,  contributeToCPP) => {
    return ({
        type: "SET_INCOME", 
        payload: {
            selectedAge: selectedAge, 
            name: name,
            financialValue: financialValue, 
            rangeBarValue: rangeBarValue,
            contributeToCPP: contributeToCPP
        }
    })
}


export const setAgeRange = (startAge, endAge) => {
    return ({
        type: "SET_AGE_RANGE", 
        payload: {
            startAge: startAge, 
            endAge: endAge
        }
    })
}

export const changeLabel = (selectedAge, label, name) => {

    return {
        type: "CHANGE_INCOME_LABEL",
        
        payload: {
            selectedAge: selectedAge, 
            name: name,
            label: label
        }
    }
}

export const removeItem = (selectedAge, name) => {
    return {
        type: "REMOVE_INCOME_TYPE", 
        payload: {
            selectedAge: selectedAge, 
            name: name,
        }
}
}
export const addItem = (selectedAge, name, label,  financialValue, rangeBarValue,  contributeToCPP) => {
    return {
        type: "ADD_INCOME_TYPE", 
        payload: {
            selectedAge: selectedAge, 
            name: name,
            label: label,
            financialValue: financialValue, 
            rangeBarValue: rangeBarValue,
            contributeToCPP: contributeToCPP
        }
}
}