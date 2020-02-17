
import {presentValue, payment} from "services/general/financial_functions"
import {inverseLogslider} from "services/general/logorithmic_functions"

    //DATA CONVERSTION FOR STACKED BAR CHART
    export const convertReducerToArrayData = (reducer) => {
        const data = Object.values(reducer).map((d, age) => {  
            const namesArray = Object.keys(d)                                                                                                              //Creates an array of all the names eg ["employmentIncome", "cppIncome", etc.]
            const valueArray = Object.values(d).map((a, i) => (a.contribute + -a.withdraw))                                                                 //Creates an array of all the financial Values eg ["22000", "1200", etc.]
            var result = {age: d.rrsp.age};                                                                                                                //I have to go into one of the objects to access its age which acts like id, I just used cppIncome because it wont be deleted
            namesArray.forEach((key, i) => result[key] = valueArray[i]);                                                                                   //Merges the two arrays into a set of key value pairs eg ["employmentIncome": 22000]   
            return result
        })
        return data 
    }


//RENDER SAVINGS - SETS ALL VALUES IN SAVINGS ARRAY
 export const renderSavings = (fromAge, toAge, name, value, rangeBarValue, transaction, savings_reducer, rrspStartAge, rate1, rate2, transaction_action, tfsaStartAge ) => {

    const retirementAge = name === "rrsp" ? rrspStartAge : tfsaStartAge
    for (let age = 18; age < fromAge; age++) {
        const contributionValue = savings_reducer[age][name].contribute
        const rangeBarValue = inverseLogslider(contributionValue )
        transaction_action(age, name, "contribute", rangeBarValue, rate1, rate2, retirementAge, contributionValue)                
    } 
    for (let age = fromAge; age < toAge; age++) {
        transaction_action(age, name, transaction, rangeBarValue, rate1, rate2, retirementAge, value)
    } 

    for (let age = toAge; age <= 95; age++) {

        const withdrawal = savings_reducer[age][name].totalValue > savings_reducer[70][name].financialValue ? savings_reducer[70][name].financialValue : 0
        const rangeBarValue = inverseLogslider(withdrawal)

        transaction_action(age, name, "withdraw", rangeBarValue,  rate1, rate2, retirementAge, withdrawal)
    } 
}


//INITIALIZE SAVINGS & WITHDRAWAL VALUES

export const initializeSavingsAndWithdrawals = (currentAge, income_reducer, rate1, rate2, rrspStartAge, tfsaStartAge, transaction_action) => {

return (
    ["rrsp", "tfsa", "nonRegistered"].map(account => {
        const retirementStartAge = account === "rrsp" ? rrspStartAge : tfsaStartAge
        const reccomendedPayment = income_reducer[72][account].financialValue > 0 ? income_reducer[72][account].financialValue : 100
        const nestEggValue = presentValue(rate2, (95-rrspStartAge), reccomendedPayment, 0)
        const value = payment(rate1, (rrspStartAge - currentAge), 0, nestEggValue) > 0 ? payment(rate1, (rrspStartAge - currentAge), 0,nestEggValue) : 100

        const rangeBarValueC = inverseLogslider(value )
        const rangeBarValueW = inverseLogslider(reccomendedPayment)
        for (let age = 18; age < retirementStartAge; age++) {
            transaction_action(age, account, "contribute", rangeBarValueC, rate1, rate2, retirementStartAge, value)
            
        }
        for (let age = retirementStartAge; age <= 95; age++) {
            transaction_action(age, account, "withdraw", rangeBarValueW, rate1, rate2, retirementStartAge, reccomendedPayment)
        } 
    return null;
    })
) 
}

//SET OPTIMIZED WITHDRAWAL VALUES AFTER CONTRIBUTION VALUES ARE INPUTTED
export   const optimizedWithdrawals = (account, savings_reducer, setOpitmizedValues_action, rate2) => {
    const futureValue = savings_reducer[65][account].totalValue
    const optimizedWithdrawal = -payment(rate2, 30, futureValue, 0)

    for (let age = 65; age <= 95; age++) {
        setOpitmizedValues_action(age, account, "optimizedWithdrawal", optimizedWithdrawal)
    } 
}

//SET OPTIMIZED CONTRIBUTION VALUES AFTER WITHDRAWAL VALUES ARE INPUTTED
export   const optimizedContribution = (account, savings_reducer, setOpitmizedValues_action, rate1) => {
    const withdrawalPayment = savings_reducer[72].rrsp.withdraw
    const nestEgg = presentValue(rate1, 30, withdrawalPayment, 0) 
    const optimizedContribution = payment(rate1, 45, 0, nestEgg)
    for (let age = 18; age <= 65; age++) {
        setOpitmizedValues_action(age, "rrsp", "optimizedContribution",optimizedContribution)
    } 
}

export const reccomendedNestEgg = (rate, startAge, withdrawal) => {

    const duration = 95 - startAge
   const value = -presentValue(rate, duration, withdrawal, 0)

   const roundedValue = Math.round(value/1000)*1000

   if (value > 1000000) {
       return `${roundedValue/1000000} M`
   }
   else return `${roundedValue/1000} K`
}

export const reccomendedSavingsPerYear = (birthYear, rate, startAge, withdrawal) => {
    const durationInRetirement = 95 - startAge
    const nestEgg = -presentValue(rate, durationInRetirement, withdrawal, 0)

    const thisYear = new Date().getFullYear()

    const age = thisYear - birthYear
    const duration = startAge - age
   const value = -payment(rate , duration, 0, nestEgg)
   const roundedValue = Math.round(value/1000)*1000
   if (value > 1000000) {
       return `${roundedValue/1000000} M`
   }
   else return `${roundedValue/1000} K`
}