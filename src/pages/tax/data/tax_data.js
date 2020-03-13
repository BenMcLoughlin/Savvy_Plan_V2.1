export const taxCredit_data = (category, fromAge, toAge, incomeFinancial, incomeRangeBar, color, type) => ({                                              //this is the initial state of value being stored to the reducer. 
    label: "New Credit",    
    type,
    category: "New Credit",                                                                                                                                                       
    fromAge: 18,
    toAge: 64,
    value: {                                                                                    
        rangeBarValue: 0,
        financialValue: 0,
        name: "value",
        label: "New Credit",
    } 
 })

export const creditTypes_data = [
    {
        type: "credit",
    },
    {
        type: "deduction",
    },
    {
        type: "ageCredit",
    }
]
export const creditList_data = {
    30000: {
        label: "Basic Personal Amount",
        type: "credit",
        line: 30000,
        maxClaimable: 12069,
        maxIncome: 10000,
    },
    30100: {
        label: "Age Amount",
        type: "ageCredit",
        line: 30100,
        maxClaimable: 7494,
        maxIncome: 87750,
    },
    31260: {
        label: "Employment Amount",
        type: "credit",
        line: 31260,
        maxClaimable: 1222,
        maxIncome: 87750,
    },

    34900: {
        label: "Donations",
        type: "credit",
        line: 34900,
        maxClaimable: 10000,
        maxIncome: 100000,
    },
}


// 22222: { 
//     registration: "rrsp",
//     label: "RRSP Contribution",    
//     category: "deduction",    
//     id: 22222,                                                                             //the label is editable by the user and is what is displayed 
//     transaction: "contribution",                                                                                        //examples include "employment", "business", "pension"
//     color: '#D8BABB',                                                                                 //Some forms of income might not be taxable such as inheritance
//     fromAge: 18,
//     toAge: 64,
//     value: {                                                                                        //The value of the income being added
//         rangeBarValue: 0,
//         financialValue: 0,
//         name: "value",
//         label: "Annual Contribution",
//     } 
//  }

export const colorArray_data = ["#4BB9D0",'#72929B',  "#B0CFE3", '#FEDE76', '#81CCAF',  '#78b7bb','#D4D4D4','#72929B', "#F29278", '#FEDE76', "#a4d7e1", "#81CCAF", '#F7CDAB', '#D8BABB']

