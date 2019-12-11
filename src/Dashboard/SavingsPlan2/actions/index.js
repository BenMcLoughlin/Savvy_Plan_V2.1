

export const transaction_action = (age, name, transaction, rangeBarValue, value, rate1, rate2) => ({
    type: "savingsPerYear_reducer2/TRANSACTION", 
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