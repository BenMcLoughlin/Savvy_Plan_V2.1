export const taxCredit_data = (eligible, age1, stream, age2, taxType, value) => ({                                              //this is the initial state of value being stored to the reducer. 
    eligible, 
    age1,
    stream,
    age2,
    taxType,                                                                                                                                               
    value,
 })



export const creditTypes_data = [
    {
        taxType: "deduction",
    },
    {
        taxType: "credit",
    }
]


export const colorArray_data = ["#4BB9D0",'#72929B',  "#B0CFE3", '#FEDE76', '#81CCAF',  '#78b7bb','#D4D4D4','#72929B', "#F29278", '#FEDE76', "#a4d7e1", "#81CCAF", '#F7CDAB', '#D8BABB']

