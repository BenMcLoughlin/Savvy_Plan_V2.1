

export const transaction_action = (age, name, transaction, rangeBarValue, value, rate1, rate2) => ({
    type: "savingsPerYear_reducer/TRANSACTION", 
            age,
            name, 
            rangeBarValue, 
            rate1,
            rate2,
            value,
            transaction
})

export const setInvestmentFactor_action = (name, value) => {
    return {
        type: "investmentReturns/SET_VALUE", 
            name, 
            value 
    }
    }
export const setOpitmizedValues_action = (age, name, transaction, value) => {
    return {
        type: "investmentReturns/SET_OPTIMIZED_VALUE", 
            age,
            name, 
            transaction,
            value,
    }
    }

export const setMaxContribution_action = (age, name, value) => ({
        type: "savingsPerYear/SET_MAX_CONTRIBUTION",
            age,
            name,
            value
    })
    
