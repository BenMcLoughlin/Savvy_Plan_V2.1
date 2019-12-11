
import {presentValue, payment} from "../../../services/financialFunctions"
import * as d3 from "d3"

const withdrawalTable = {
    50:	0.025,
    51:	0.026,
    52:	0.026,
    53:	0.027,
    54:	0.028,
    55:	0.029,
    56:	0.029,
    57:	0.030,
    58:	0.031,
    59:	0.032,
    60:	0.033,
    61:	0.034,
    62:	0.036,
    63:	0.037,
    64:	0.038,
    65:	0.04,
    66:	0.0417,
    67:	0.0435,
    68:	0.0455,
    69:	0.0476,
    70:	0.0500,
    71:	0.0528,
    72:	0.0540,
    73:	0.0553,
    74:	0.0567,
    75:	0.0582,
    76:	0.0598,
    77:	0.0617,
    78:	0.0636,
    79:	0.0658,
    80:	0.0682,
    81:	0.0708,
    82:	0.0738,
    83:	0.0771,
    84:	0.0808,
    85:	0.0851,
    86:	0.0899,
    87:	0.0955,
    88:	0.1021,
    89:	0.1099,
    90:	0.1192,
    91:	0.1306,
    92:	0.1449,
    93:	0.1634,
    94:	0.1879,
    95: 0.2,
}


const calculateRRIFPaymentTable = (age, balance, returnOnInvestment) => {
    const rate = withdrawalTable[age]
    return rate * balance
}






console.log(calculateRRIFPaymentTable(65,100000, .03));


export const setReccomendedSavingaPlan = (account, calculateReccomendedSavings_action, incomePerYear_reducer, investmentReturns_reducer, setReccomendedSavingsValue_action) => {
    
                                          
    const rate1 = investmentReturns_reducer.rate1()
    const rate2= investmentReturns_reducer.rate2()

    const withdrawal = incomePerYear_reducer[72][account].financialValue
    const valueAtRetirement = presentValue(rate2, 30, withdrawal, 0)
    const reccomendedSavings = payment(rate1 , 45, 0, valueAtRetirement)

    for (let age = 20; age < 65; age ++) {
        setReccomendedSavingsValue_action(age, reccomendedSavings, account )  
        calculateReccomendedSavings_action(age, account, rate1, rate2 )                                                     
    }
    for (let age = 65; age <= 95; age++ ) {
        setReccomendedSavingsValue_action(age, -withdrawal, account)   
        calculateReccomendedSavings_action(age, account, rate1, rate2 )                                                     
    }
}


    //DATA CONVERSTION FOR STACKED BAR CHART
    export const convertReducerToArrayData = (reducer, chartDisplayValue) => {
    const data = Object.values(reducer).map(d => {  
        const namesArray = Object.keys(d)                                                                                                 //Creates an array of all the names eg ["employmentIncome", "cppIncome", etc.]
        const valueArray = Object.values(d).map(a => a[chartDisplayValue])                                                                 //Creates an array of all the financial Values eg ["22000", "1200", etc.]
        var result = {age: d.rrsp.age};                                                                                                    //I have to go into one of the objects to access its age which acts like id, I just used cppIncome because it wont be deleted
        namesArray.forEach((key, i) => result[key] = valueArray[i]);                                                             //Merges the two arrays into a set of key value pairs eg ["employmentIncome": 22000]   
        return result
    })
    return data 
}


 //DETERMINE MAX OR MIN VALUE FOR D3 Y-SCALE

export const calculateYScaleMax = (data, baseValue) => {
   const value =  d3.max(data, d =>  Object.values(d).reduce((acc,num) => acc + num) ) < baseValue ? baseValue : 
    d3.max(data, d => Object.values(d).reduce((acc,num) => acc + num)) + 1000
    return value
 }
 
export const calculateYScaleMin = (data, baseValue) => {
   const value =  d3.min(data, d =>  Object.values(d).reduce((acc,num) => acc + num) ) > baseValue ? baseValue : 
    d3.min(data, d => Object.values(d).reduce((acc,num) => acc + num)) - 4000
    return value
 }
