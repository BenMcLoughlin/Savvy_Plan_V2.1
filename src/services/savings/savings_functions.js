
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



    
//CREATES A NEW SAVINGS INSTANCE
export const createSavingsInstance = (newInstance, setKeyValue_action) => {                                                                                               //This creates a new Savings Instance, such as from ages 18-22
        const id = (Math.random() * 10000000000).toFixed()                                                                           //creates the random ID that is the key to the object
           
               setKeyValue_action(id, "main_reducer",  {...newInstance, id})                                                           //This action fires and sets a savings instance in the reducer, this could be a contribution or withdrawal
               setKeyValue_action((newInstance.transaction === "withdrawal" ? "id" : "id2"), "ui_reducer", id)
                                                                                                                                                                                                                    // determines which income instance to show within the edit box
    }

    export const deleteInstance = (delete_action, id, reducer, reg, setKeyValue_action) => {       //deletes the instance

        delete_action(id, reducer)
              setKeyValue_action("id", "ui_reducer", "TFSAwithdrawal")
              setKeyValue_action("id2", "ui_reducer", "TFSAcontribution")
        }



/// SAVINGS FUNCTIONS 
const getValue = (age, priorValue, reg, main_reducer, transaction) => {                                                     //Helper function which will return the income value in the chart
                       
    const types = Object.values(main_reducer).filter( d => d.reg === reg)                                            //filter reducer to get an array of instances with the same registration, eg find all "TFSA" contributions & withdrawals
    if (types.length > 0) {
        const array = types.map(d => d.transaction === transaction                                                      //for each income transaction it is collecing all the contributions or withdrawals reported for that age
                                    && age >= d.age1                                                                        //Checks if the given age is between the start and end age
                                    && age < d.age2 ?                                         
                                    d.value 
                                    : 0                                                                                        //If it is it returns the financial value, giving an array of financial values
       )
       const amount =  Math.max(...array)                                                                                       //If the person has inputted more than one amount for the sane age range this will return the max
       return priorValue > amount ? amount : priorValue > 0 ? priorValue: 0                                                     //for withdrawals this ensures there is money in the account that can be withdrawn
    }
   return 0
    }
    
/// CREATES ARRAY WITH SAVINGS VALUES FOR EACH USER YEAR 
export const createProjection = (balance, lifeSpan, rate1, rate2, reg, main_reducer, userAge, rrifStartAge)   => {
                
    const array = [                                                                                                            //initialize the array with an empty object, this way we can use refer to the prior object in the array
        {
            contribution: balance,                                                                                             //Balance is received from the networth_reducer
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

        const prior = array[age - userAge]                                                                                     //this refers to the object before this one in the array           
        const newObject = {
                           age: age                                                                                            //Initialize a new object
                            } 
        const contribution = getValue(age, 1000000, reg, main_reducer, "contribution")                                               //sums all contributions made when the user was that age
        const withdrawal = getValue(age, prior.value, reg, main_reducer, "withdrawal",)                                                  //sums all withdrawals for the age period
        const contributionRoom = prior.contributionRoom + 6000
        const availableRoom = 6000 - contribution + prior.availableRoom
        const interest = age < 65 ? prior.value * rate1 : prior.value * rate2                                                 //interest is different according to their risk levels 
        const minWithdrawal = age >= rrifStartAge ? RRIFMinimumTable[age] * prior.value : 0
        const value = prior.value + contribution - withdrawal - minWithdrawal + interest
        const principlePercentage = prior.principle / prior.value
        const principle = age === userAge ? prior.contribution + contribution : prior.principle + contribution - (withdrawal * principlePercentage) - (minWithdrawal * principlePercentage)
        const interestPercentage = prior.totalInterest / prior.value
        const totalInterest = age === 18 ? prior.interest : prior.totalInterest + interest - (withdrawal * interestPercentage)- (minWithdrawal * interestPercentage)

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
   return  income.map(d => ({...d, "RRSP Withdrawals": (rrifObject[d.age] ? rrifObject[d.age] : 0)}))                 //now we map through income and create a new array with the same objects, if the rrifObject age exists then we add the minWithdrawal
 }
 
export const addMinWithdrawalsToIncomeReducer = (income, rrif) => {
    const rrifObject = {}                                                                                        //When we do the map below we don't want to filter the array each time, so we convert the array to an object
     for (let i = 0; i <= rrif.length -1; i++) {                                                                 //we loop through the rrif
         const age = rrif[i].age                                                                                 //determine the age for each i and assign the minimum Withdrawal to it
         rrifObject[age] = rrif[i].minWithdrawal
         }
   return  income.map(d => ({...d, "RRSP Withdrawals": (rrifObject[d.age] ? rrifObject[d.age] : 0)}))                 //now we map through income and create a new array with the same objects, if the rrifObject age exists then we add the minWithdrawal
 }
 

 export const instanceArray_function = (main_reducer, transaction, reg) => {
    return Object.values(main_reducer)  
                 .filter(d => d.transaction === transaction)
                 .filter(d => d.reg === reg)
                 .sort((a, b) => a.age1 - b.age1)        //here we take the instance, eg TFSA contributions, and make an array of all the instances of that income
 }