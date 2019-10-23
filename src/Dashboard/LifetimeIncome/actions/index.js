
export const setIncome = (selectedAge, name, financialValue, rangeBarValue,  contributeToCPP) => {
    return ({
        type: "SET_INCOME", 
        payload: {
            selectedAge: selectedAge, 
            name: name,
            financialValue: Math.round(financialValue*100)/100, 
            rangeBarValue: rangeBarValue,
            contributeToCPP: contributeToCPP
        }
    })
}


export const setAgeRange = (fromAge, toAge) => {
    return ({
        type: "SET_AGE_RANGE", 
        payload: {
            fromAge: fromAge, 
            toAge: toAge
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
export const addItem = (selectedAge, name, label,  financialValue, rangeBarValue,  contributeToCpp) => {
    return {
        type: "ADD_INCOME_TYPE", 
        payload: {
            selectedAge: selectedAge, 
            name: name,
            label: label,
            financialValue: financialValue, 
            rangeBarValue: rangeBarValue,
            contributeToCpp: contributeToCpp
        }
}
}
export const setRRSPDetails = (currentAge, name, financialValue, rangeBarValue) => {
    return {
        type: "SET_RRSP_DETAILS", 
        payload: {
            currentAge: currentAge, 
            name: name,
            financialValue: financialValue, 
            rangeBarValue: rangeBarValue,
        }
}
}
export const setFutureRRSPValue = (financialValue) => {
    return {
        type: "SET_FUTURE_RRSP_VALUE", 
        payload: {
            financialValue: financialValue, 
        }
}
}

export const setPensionStartAge = (name, rangeBarValue) => {
    return {
        type: "SET_PENSION_AGE", 
        payload: {
            name: name,
            rangeBarValue: rangeBarValue
        }
    }
}
export const setLifetimeIncomeVariable = (name, value) => {
    return {
        type: "SET_LIFETIME_INCOME_VARIABLE", 
        payload: {
            name: name,
            value: value,
        }
    }
}

export const setAverageLifetimeEarnings = (value) => {
    return {
        type: "SET_AVERAGE_LIFETIME_EARNINGS", 
        payload: {
            value: value
        }
    }
}
export const calculateCPP = (cppStartAge, selectedAge) => {
    return {
        type: "CALCULATE_CPP", 
        payload: {
            cppStartAge: cppStartAge,
            selectedAge: selectedAge,
        }
    }
}
export const clearCPPIncomeBeforeStartAge = (selectedAge) => {
    return {
        type: "CLEAR_CPP_INCOME", 
        payload: {
           selectedAge: selectedAge
        }
    }
}
export const calculateOAS = (oasStartAge, selectedAge) => {
    return {
        type: "CALCULATE_OAS", 
        payload: {
            oasStartAge: oasStartAge,
            selectedAge: selectedAge,
        }
    }
}
export const clearOASIncomeBeforeStartAge = (selectedAge) => {
    return {
        type: "CLEAR_OAS_INCOME", 
        payload: {
           selectedAge: selectedAge
        }
    }
}
