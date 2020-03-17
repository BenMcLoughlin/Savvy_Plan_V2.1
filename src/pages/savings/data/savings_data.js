
export const savingsInstance_data = (financialValue, fromAge, rangeBarValue,  toAge, registration, transaction) => ({                                              //this is the initial state of income being stored to the reducer. 
    label: transaction,            //(instance.value.financialValue, (+endAge), instance.value.rangeBarValue,  (+endAge + 5), registration, transaction)                                                                           //the label is editable by the user and is what is displayed 
    type: "retirementIncome",
    category: "TFSA Income",
    registration,    
    transaction,                                                                                        //examples include "employment", "business", "pension"
    color: '#8CB8B7',                                                                                           //Some forms of income might not be taxable such as inheritance
    type: "tsfaIncome",
    fromAge,
    toAge,
    value: {                                                                                        //The value of the income being added
        rangeBarValue,
        financialValue,
        name: "value",
        label: `Annual ${transaction}`,
    },
})

