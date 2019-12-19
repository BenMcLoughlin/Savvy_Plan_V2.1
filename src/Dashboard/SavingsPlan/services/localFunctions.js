
import {presentValue, payment} from "../../../services/financialFunctions"
import {inverseLogslider} from "../../../services/logorithmicFunctions"
import * as d3 from "d3"


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
    export const convertReducerToArrayData = (reducer) => {
        const data = Object.values(reducer).map((d, age) => {  
            const namesArray = Object.keys(d)                                                                                                 //Creates an array of all the names eg ["employmentIncome", "cppIncome", etc.]
            const valueArray = Object.values(d).map((a, i) => (a.contribute + -a.withdraw))                                                                 //Creates an array of all the financial Values eg ["22000", "1200", etc.]
            var result = {age: d.rrsp.age};                                                                                                    //I have to go into one of the objects to access its age which acts like id, I just used cppIncome because it wont be deleted
            namesArray.forEach((key, i) => result[key] = valueArray[i]);                                                             //Merges the two arrays into a set of key value pairs eg ["employmentIncome": 22000]   
            return result
        })
        return data 
    }


//RENDER SAVINGS - SETS ALL VALUES IN SAVINGS ARRAY
 export const renderSavings = (fromAge, toAge, name, value, rangeBarValue, transaction, savingsPerYear_reducer, transaction_action, rate1, rate2 ) => {

    for (let age = 18; age < fromAge; age++) {
        const contributionValue = savingsPerYear_reducer[age][name].contribute
        const rangeBarValue = inverseLogslider(contributionValue )
        transaction_action(age, name, "contribute", rangeBarValue, contributionValue, rate1, rate2)
    } 
    for (let age = fromAge; age < toAge; age++) {
        transaction_action(age, name, transaction, rangeBarValue, value, rate1, rate2)
    } 
    for (let age = toAge; age <= 95; age++) {
        const withdrawalValue = savingsPerYear_reducer[age][name].withdraw
        const rangeBarValue = inverseLogslider(withdrawalValue )
        transaction_action(age, name, "withdraw", rangeBarValue, withdrawalValue,  rate1, rate2)
    } 
}


//INITIALIZE SAVINGS & WITHDRAWAL VALUES

export const initializeSavingsAndWithdrawals = (incomePerYear_reducer, transaction_action, rate1, rate2) => {
    ["rrsp", "tfsa", "nonRegistered"].map(account => {
        const reccomendedPayment = incomePerYear_reducer[72][account].financialValue > 0 ? incomePerYear_reducer[72][account].financialValue : 100
        const nestEggValue = presentValue(rate2, 30, reccomendedPayment, 0)
        const value = payment(rate1, 40, 0,nestEggValue) > 0 ? payment(rate1, 40, 0,nestEggValue) : 100
        const rangeBarValueC = inverseLogslider(value )
        const rangeBarValueW = inverseLogslider(reccomendedPayment)
        for (let age = 18; age < 65; age++) {
            transaction_action(age, account, "contribute", rangeBarValueC, value, rate1, rate2)
        }
        for (let age = 65; age <= 95; age++) {
            transaction_action(age, account, "withdraw", rangeBarValueW, reccomendedPayment, rate1, rate2)
        } 
    })
}

//SET OPTIMIZED WITHDRAWAL VALUES AFTER CONTRIBUTION VALUES ARE INPUTTED
export   const optimizedWithdrawals = (account, savingsPerYear_reducer, setOpitmizedValues_action, rate2) => {
    const futureValue = savingsPerYear_reducer[65][account].totalValue
    const optimizedWithdrawal = -payment(rate2, 30, futureValue, 0)

    for (let age = 65; age <= 95; age++) {
        setOpitmizedValues_action(age, account, "optimizedWithdrawal", optimizedWithdrawal)
    } 
}

//SET OPTIMIZED CONTRIBUTION VALUES AFTER WITHDRAWAL VALUES ARE INPUTTED
export   const optimizedContribution = (account, savingsPerYear_reducer, setOpitmizedValues_action, rate1) => {
    const withdrawalPayment = savingsPerYear_reducer[72].rrsp.withdraw
    const nestEgg = presentValue(rate1, 30, withdrawalPayment, 0) 
    const optimizedContribution = payment(rate1, 45, 0, nestEgg)

    for (let age = 18; age <= 65; age++) {
        setOpitmizedValues_action(age, "rrsp", "optimizedContribution",optimizedContribution)
    } 
}

export const reccomendedNestEgg = (rate, rrifStartAge, withdrawal) => {
    const duration = 95 - rrifStartAge
   const value = -presentValue(rate, duration, withdrawal, 0)
   const roundedValue = Math.round(value/1000)*1000
   if (value > 1000000) {
       return `${roundedValue/1000000} M`
   }
   else return `${roundedValue/1000} K`
}