export const setIncomeForTaxCalculator = (name, financialValue, rangeBarValue, section) => {
    return ({
        type: "SET_INCOME_FOR_TAX_CALCULATOR", 
        payload: {
            name: name,
            financialValue: Math.round(financialValue*100)/100, 
            rangeBarValue: rangeBarValue,
            section: section
        }
    })
}


