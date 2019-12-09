

export const setSavingsValue_action = (age, financialValue, label, name, rangeBarValue) => {
return {
    type: "savingsPerYear/SET_VALUE", 
            age,
            name,
            financialValue,
            rangeBarValue
}
}
export const setReccomendedSavingsValue_action = (age, reccomendedFinancialValue, name) => {
return {
    type: "savingsPerYear/SET_RECCOMENDED_VALUE", 
            age,
            name,
            reccomendedFinancialValue,
}
}


export const calculateSavings_action = (age, name, rate1, rate2) =>  ({
    type: "savingsPerYear/CALCULATE_SAVINGS",
        age, 
        name,
        rate1, 
        rate2
}) 


export const calculateReccomendedSavings_action = (age, name, rate1, rate2) =>  ({
    type: "savingsPerYear/CALCULATE_RECCOMENDED_SAVINGS",
        age, 
        name,
        rate1, 
        rate2
}) 

export const calculateRrifWithdrawal_action = (age, rrifPayment) => ({
    type: "savingsPerYear/CALCULATE_RRIF_WITHDRAWAL",
    age, 
    rrifPayment
})
export const setMaxContribution_action = (age, name, value) => ({
    type: "savingsPerYear/SET_MAX_CONTRIBUTION",
        age,
        name,
        value
})


export const setInvestmentFactor_action = (name, value) => {
    return {
        type: "investmentReturns/SET_VALUE", 
            name, 
            value 
    }
    }

    export const setWithdrawalValue_action = (financialValue, label, name, rangeBarValue) => {
        return {
            type: "withdrawals/SET_VALUE", 
            payload: {
                name,
                label,
                financialValue,
                rangeBarValue
            }    
        }
        }