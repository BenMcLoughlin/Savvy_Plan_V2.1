
import {presentValue, payment} from "services/general/financial_functions"
import {inverseLogslider} from "services/general/logorithmic_functions"
import {RRIFMinimumTable} from "services/savings/savings_tables"

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



/// NEW SAVINGS FUNCTIONS 

const getTransaction = (savings_reducer, transaction, registration,  age,  value) => {                                                     //Helper function which will return the income value in the chart

    const transactions = Object.values(savings_reducer).filter( d => d.registration === registration)
  
    if (transactions.length > 0) {
        const arrayOfContributions = transactions.map(d => d.transaction === transaction                                       //for each income transaction it is collecing all the income reported for that age
                                    && age >= d.fromAge                                                                        //Checks if the given age is between the start and end age
                                    && age <= d.toAge ?                                         
                                    d.value.financialValue 
                                    : 0                                                                                        //If it is it returns the financial value, giving an array of financial values
       )
    
       const amount =  Math.max(...arrayOfContributions)                                                                      //If the person has inputted more than one income amount for the sane age range this will return the max
       return value > amount ? amount : value > 0 ? value : 0
    }
   return 0
    }

export const createProjection = (savings_reducer, userAge, lifeSpan, rate1, rate2, balance, registration, rrifStartAge)   => {

    const array = [
        {
            contribution: balance,
            withdrawal: 0,
            principle: 0,
            interest: 0,
            totalInterest: 0,
            principlePercentage: 0,
            value: balance,
            contributionRoom: 0,
            availableRoom: 0,
            minWithdrawal: 0, 
        }
    ]

    for(let age = userAge; age <= lifeSpan; age++) {

        const last = array[age - userAge]                                                              //this refers to the object before this one in the array
                                                         
        const newObject = {age: age}                                                                        //Initialize a new object

        const contribution = getTransaction(savings_reducer, "contribution", registration, age, 1000000) 
        const withdrawal = getTransaction(savings_reducer, "withdrawal", registration, age, last.value)
        const contributionRoom = last.contributionRoom + 6000
        const availableRoom = 6000 - contribution + last.availableRoom
        const interest = age < 65 ? last.value * rate1 : last.value * rate2
        const minWithdrawal = age >= rrifStartAge ? RRIFMinimumTable[age] * last.value : 0
        const value = last.value + contribution - withdrawal - minWithdrawal + interest

        const principlePercentage = last.principle / last.value
  
        const principle = age === userAge ? last.contribution + contribution : last.principle + contribution - (withdrawal * principlePercentage) - (minWithdrawal * principlePercentage)

        const interestPercentage = last.totalInterest / last.value
        const totalInterest = age === 18 ? last.interest : last.totalInterest + interest - (withdrawal * interestPercentage)- (minWithdrawal * interestPercentage)
 

        const details = {...newObject,
             contribution, 
             withdrawal, 
             availableRoom,
             contributionRoom,
             principle: principle > 0 ? principle : 0, 
             interest, 
             totalInterest: totalInterest > 0 ? totalInterest : 0,
             value: value > 0 ? value : 0,
             minWithdrawal, 
            }

        array.push(details)
    }
    return array.slice(1, array.length)
}



export const addMinWithdrawalsToIncome = (income, rrif) => {
    const rrifObject = {}                                                                                        //When we do the map below we don't want to filter the array each time, so we convert the array to an object
     for (let i = 0; i <= rrif.length -1; i++) {                                                                 //we loop through the rrif
         const age = rrif[i].age                                                                                 //determine the age for each i and assign the minimum Withdrawal to it
         rrifObject[age] = rrif[i].minWithdrawal
         }
   return  income.map(d => ({...d, "RRSP Income": (rrifObject[d.age] ? rrifObject[d.age] : 0)}))                 //now we map through income and create a new array with the same objects, if the rrifObject age exists then we add the minWithdrawal
 }
 