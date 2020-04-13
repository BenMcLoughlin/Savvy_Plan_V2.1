import {payment}from "services/general/financial_functions"




//CONVERTS REDUCER TO ARRAY FOR CHART 
export const convertReducerToArray = (reducer, lifeSpan) => {                                                                       //takes the reducer, an object of objects, and the userAge
    const incomeStreams = Object.values(reducer).filter(d => d.incomeType)                                        //Converts reducer to an array of objects, only income streams have the income type property

    //RETURNS INCOME VALUE FOR THE GIVEN INCOME INSTANCE    
      const returnIncome = (incomeStreams, stream, age) => {                                                     //Helper function which will return the income value in the chart

        if (incomeStreams.length > 0) {
            const arrayOfIncome = incomeStreams.map(d => d.stream === stream                                   //for each income stream it is collecing all the income reported for that age
                                        && age >= d.age1                                                        //Checks if the given age is between the start and end age
                                        && age < d.age2 ?                                         
                                        d.value : 0                                                //If it is it returns the financial value, giving an array of financial values
            )
            return Math.max(...arrayOfIncome)                                                                      //If the person has inputted more than one income amount for the sane age range this will return the max
        }
       return 0
        }

     let arrayOfLabels = [...new Set(incomeStreams.map(d => d.stream))]                                         //Map through the array returning categories, if theres more then one we only want one stream name. Set filters it down to one name each.          
 
     const array = []                                                                                             //Initialize and empty array to push into
     for (let age = 18; age <= lifeSpan; age++) {                                                                        //For loop showing their income till age 95
         const itemObject = {age: age}                                                                            //The age is used as the x axis
         const details = Object.assign(itemObject,  ...arrayOfLabels.map(stream => (                            //We need an object for each income stream, we map and assign the stream to the object
                             {[stream]: returnIncome(incomeStreams, stream, age)}                             //Checks to see if income has been input for this age, if so the financial value is returned
                             )))
         array.push(details)                                                                                      //Pushes the object to the array
     }
     return array
 
 }

export const calculateRRSPIncome = (age1, age2, array, type) => {                                                             //we need to distill rrsp income into one object that can be added to the reducer  

    const filteredArray = type === "preAge80" ? array.filter(d => d.minWithdrawal > 0).filter( d => d.age <= 80)                                                      //we're going to just get an average which will be used in the tax calculation
                                              : array.filter( d => d.minWithdrawal > 0).filter( d => d.age > 80)    
    const avgMinWithdrawal = filteredArray.reduce((a, n) => (a + n.minWithdrawal), 0) / filteredArray.length                          //sum up all ann rrsp income that includes the min withdrawal and their additional withdrawal                                                                                                      //divide by the length of the array to get the averaege
 return ({                                                                                                           //this object is now added to the income reducer, representing all rrsp income
        age1: type == "preAge80" ? age1 : 80,                                                                           //age1 is the selected retirement age
        reg: "RRSP",      
        stream: "RRSP Income",                                                                                         
        taxable: true, 
        age2: type == "preAge80" ? 80 : age2, 
        value: filteredArray.length > 1 ? avgMinWithdrawal : 0
    })
}


const historicRRSP = {
    1990: 63889,
    1991: 69444,
    1992: 69444,
    1993: 75000,
    1994: 80556,
    1995: 86111,
    1996: 75000,
    1997: 75000,
    1998: 75000,
    1999: 75000,
    2000: 75000,
    2001: 75000,
    2002: 75000,
    2003: 86111,
    2004: 91667,
    2005: 100000,
    2006: 105556,
    2007: 111111,
    2008: 116667,
    2009: 122222,
    2010: 124722,
    2011: 127611,
    2012: 132333,
    2013: 134833,
    2014: 138500,
    2015: 140944,
    2016: 144500,
    2017: 145722,
    2018: 147222,
    2019: 151278,
    2020: 154611,
};




export const calculateStartValue = (age, account, state) => {
    return state[age-1][account].endValue

}
export const calculateEndValue = (startValue, age, account,state) => {
    const {contribution, percentageReturn, withdrawal} = state[age][account]
    return  startValue * (1 + percentageReturn) + contribution - withdrawal

}

export const calculateOptimumIncomeStreams = (retirementIncome, pensionIncome, maxRrspPayment, maxTfsaPayment, highestIncomes) => {

        if (highestIncomes < 47000) {
            const incomeLessPension = retirementIncome - pensionIncome > 0 ? retirementIncome - pensionIncome : 0                                                              //this is the difference between the income they would like and what they are recieving from pensions
            const tfsaIncome = incomeLessPension > maxTfsaPayment ? maxTfsaPayment : incomeLessPension * .7                              //Their first goal should be to draw income from TFSA because of their lower tax bracket
            const taxAdvantagedDifferentialLessTfsa = incomeLessPension - tfsaIncome
            const rrspIncome = taxAdvantagedDifferentialLessTfsa > maxRrspPayment ? maxRrspPayment : taxAdvantagedDifferentialLessTfsa 
    
            const nonRegistered = taxAdvantagedDifferentialLessTfsa - rrspIncome
            return  {
                rrsp: rrspIncome > 0 ? rrspIncome : 0,
                tfsa: tfsaIncome > 0 ? tfsaIncome : 0, 
                nonRegistered,
            }
        }
        else if (highestIncomes > 47000 && highestIncomes < 96000) {
            const taxAdvantagedDifferential = 40000 - pensionIncome
            const incomeLessPension = retirementIncome - pensionIncome > 0 ? retirementIncome - pensionIncome : 0 
            const rrspIncomeBelowTaxTop = taxAdvantagedDifferential > maxRrspPayment ? maxRrspPayment : taxAdvantagedDifferential
            const rrspIncome = incomeLessPension > rrspIncomeBelowTaxTop ? rrspIncomeBelowTaxTop : incomeLessPension 
            const taxAdvantagedDifferentialLessRrsp = retirementIncome - rrspIncome - pensionIncome
            const tfsaIncome = taxAdvantagedDifferentialLessRrsp > maxTfsaPayment ? maxTfsaPayment : taxAdvantagedDifferentialLessRrsp
            const nonRegistered = taxAdvantagedDifferentialLessRrsp - tfsaIncome 
       
            return  {
                rrsp: rrspIncome > 0 ? rrspIncome : 0,
                tfsa: tfsaIncome > 0 ? tfsaIncome : 0, 
                nonRegistered,
            }
        }
        else {
            const taxAdvantagedDifferential = 77000 - pensionIncome
            const rrspIncome = taxAdvantagedDifferential > maxRrspPayment ? maxRrspPayment : taxAdvantagedDifferential
            const taxAdvantagedDifferentialLessRrsp = retirementIncome - rrspIncome - pensionIncome
            const tfsaIncome = taxAdvantagedDifferentialLessRrsp > maxTfsaPayment ? maxTfsaPayment : taxAdvantagedDifferentialLessRrsp
            const nonRegistered = taxAdvantagedDifferentialLessRrsp - tfsaIncome 
       
            return  {
                rrsp: rrspIncome > 0 ? rrspIncome : 0,
                tfsa: tfsaIncome > 0 ? tfsaIncome : 0, 
                nonRegistered,
            }
        }
    
    }

//SET MAXIMUM CONTRIBUTIONS IN SAVINGS REDUCER


    export const setMaxContributions = ( birthYear, main_reducer, rrspStartAge, setMaxContribution_action, tfsaStartAge) => {

       for (let age = 18; age < rrspStartAge; age ++) {
            const year = age + birthYear                                                                                                                                                      //year is used to determine the contribution room avaibale from the government
            const contributionLimit = historicRRSP[year] ? historicRRSP[year]  : 154611
            const totalRrspContEligibleIncome = Object.values(main_reducer[age])                                                                                              //We're looking up their income for that year so we can sum it all
                                                                    .filter(d => d.type)                                                                                    //We only want to sum income on which RRSP is eligible so we remove income on which CPP contributions aren't made
                                                                    .map(d => d.financialValue).reduce((acc, num) => acc + num)                                                        //Sum the value of all income streams

            const rrspMaxContribution = totalRrspContEligibleIncome > contributionLimit ? (contributionLimit * .18) : (totalRrspContEligibleIncome * .18)
            // console.log(`
            // totalRrspContEligibleIncome: ${totalRrspContEligibleIncome}
            // contributionLimit: ${contributionLimit}
            // rrspMaxContribution: ${rrspMaxContribution}
            // `
            //     )
                ;
           setMaxContribution_action(age, "rrsp", rrspMaxContribution)
         }
        
        for (let age = 18; age < tfsaStartAge; age ++) {

           if (birthYear + age < 2009 && birthYear + age < 2013) {                                                                                                      //The government increased TFSA contributions each year, this is checking the years and inputting the correct contribution max
            setMaxContribution_action(age, "tfsa", 5000)
           }
           if (birthYear + age > 2012 && birthYear + age < 2015) {
            setMaxContribution_action(age, "tfsa", 5500)
           }
           if (birthYear + age === 2015) {
            setMaxContribution_action(age, "tfsa", 10000)
           }
           if (birthYear + age > 2015 && birthYear + age < 2019) {
            setMaxContribution_action(age, "tfsa", 5500)
           }
           if (birthYear + age > 2018) {
            setMaxContribution_action(age, "tfsa", 6000)
           }
        }
        
        }


//SET MAXIMUM CONTRIBUTIONS IN SAVINGS REDUCER
 export const determineMaxRegisteredPayments = (main_reducer, rrspStartAge, tfsaStartAge, rate1, rate2) => {

            const rrspContributionArray = Object.values(main_reducer).slice(0,(rrspStartAge - 18)).map(d => d.rrsp.maxContribution)
            const maxRrspValue = rrspContributionArray.reduce((acc, num) => (acc * (1 + rate1)) + num)
            const maxRrspPayment = payment(rate2, (95-rrspStartAge), maxRrspValue, 0)
            
            const tfsaContributionArray = Object.values(main_reducer).slice(0-(tfsaStartAge - 18)).map(d => d.tfsa.maxContribution)
            const maxTfsaValue = tfsaContributionArray.reduce((acc, num) => (acc * (1 + rate1)) + num)
            const maxTfsaPayment = payment(rate2, (95-tfsaStartAge), maxTfsaValue, 0)
            
            
            const incomeArray = Object.values(main_reducer).map(d => Object.values(d).map(a => a.financialValue).reduce((acc, num) => acc + num)).slice(0,47)
            
            const highestIncomes = incomeArray.sort((a, b)=> b-a).slice(0,10).reduce((acc, num) => acc + num) /10
            return {
                maxTfsaPayment: -maxTfsaPayment,
                maxRrspPayment: -maxRrspPayment,
                highestIncomes
            }
        }

//HELPER FUNCTIONS
export const sum = (age, name, query, reducer) => Object.values(reducer).map(d => d[name] === query 
    && age >= d.age1
    && age < d.age2 ?
    d.value : 0 )
    .reduce((a, n) => a + n)


        //CANADA CHILD BENEFIT CALCULATION
export const calculateCcb = (birthYear, main_reducer, user_reducer) => {
   
    const ccbRates = {
        1: {
            r1: 0.07, 
            r2: 0.032, 
            c: 2541, 
        },
        2: {
            r1: 0.135, 
            r2: 0.057, 
            c: 4901, 
        },
        3: {
            r1: 0.19, 
            r2: 0.08, 
            c: 6898, 
        },
        4: {
            r1: 0.23, 
            r2: 0.095, 
            c: 8350, 
        },
    }

    const kidsArray = Object.keys(user_reducer).filter(d => d.startsWith("child"))         //filter out an array of strings that say "child1BirthYear", they can add as many kids as they like
    const firstKidBirthYear = user_reducer[kidsArray[1]]                                   //grab first year that they have a kid
    const lastKidBirthYear = user_reducer[kidsArray[kidsArray.length - 1]]                //grab last year that they have a kid
    const ageAtFirstChild =  firstKidBirthYear - birthYear                                 //determine their age at first child
    const ageAtLastChild =  (lastKidBirthYear - birthYear) + 17                                                         //determine their age when last child turns 17


        const array = []
        for (let age = ageAtFirstChild; age <=ageAtLastChild; age++) {
           const inc = sum(age, "taxable", true, main_reducer)
    
         //  console.log(inc);
    
            const currentYear = birthYear + age
            const ages = kidsArray.map(d => currentYear - user_reducer[d])
            
           // console.log(ages);
    
            const kids = kidsArray.filter(d => user_reducer[d] <= currentYear).length
            const r1 = ccbRates[kids].r1
            const r2 = ccbRates[kids].r2
            const c = ccbRates[kids].c
    
           // console.log("currentYear", currentYear, "kids", kids);
    
            const max = ages.map(d => d >= 0 && d <= 6 ? 6639 : d <= 17 ? 5602 : 0).reduce((a, n) => a + n)
    
            const reduction = inc <= 31120 ? 0 : inc <= 67426 ? (inc - 31120) * r1 : ((inc - 67426) * r2) + c 
            const value = max - reduction > 0 ? max - reduction : 0
           
            array.push({
                    color: "#ffd152", 
                    age1: age, 
                    type: "otherIncome", 
                    stream: "Child Benefit", 
                    taxable: true, 
                    age2: age + 1, 
                    value: value,
            })
        }
                                                                                            
        return array

        }

export const addCcbToIncome = (income_selector, ccbArray) => {
console.log(ccbArray);
    for (let i = 0; i < ccbArray.length; i++) {
        const id = `ccb${ccbArray[i].age1}`
        income_selector[id] = {...ccbArray[i]}
    }  
    return income_selector
}