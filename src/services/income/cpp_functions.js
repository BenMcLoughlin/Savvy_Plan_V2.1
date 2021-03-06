
const historicYmpe = {
    1971: 5400,
    1972: 5500,
    1973: 5600,
    1974: 6600,
    1975: 7400,
    1976: 8300,
    1977: 9300,
    1978: 10400,
    1979: 11700,
    1980: 13100,
    1981: 14700,
    1982: 16500,
    1983: 18500,
    1984: 20800,
    1985: 23400,
    1986: 25800,
    1987: 25900,
    1988: 16500,
    1989: 27700,
    1990: 28900,
    1991: 30500,
    1992: 32200,
    1993: 33400,
    1994: 34400,
    1995: 34900,
    1996: 35400,
    1997: 35800,
    1998: 36900,
    1999: 37400,
    2000: 37600,
    2001: 38300,
    2002: 39100,
    2003: 39900,
    2004: 40500,
    2005: 41100,
    2006: 42100,
    2007: 43700,
    2008: 44900,
    2009: 46300,
    2010: 47200,
    2011: 48300,
    2012: 50100,
    2013: 51100,
    2014: 52500,
    2015: 53600,
    2016: 54900,
    2017: 55300,
    2018: 55900,
    2019: 57400,
};

const fiveYearYMPE = 58000

const adjustCppMemoized = () =>  {                                                                  //CPP is either increased or reduced according to the age the user takes it
    let cache = {};                                                                                 //To increase speed this function is memoized
    return function( age, cacheKey, income) {
        if (cacheKey in cache) {
            return cache[cacheKey]
        } else {
            if (age < 65) {                                                                          //If Income is less than 65 it is reduced by 7.2% per year
                const years = 65 - age 
                const percentage = years * .072
                const value = income * (1-percentage)
                return value
             }
             else if (age === 65) {return income}                                                     //If age is 65 it is the amount originally calculatied
             
             else if (age > 65) {                                                                     //If age is over 65 income is increased by 7.2% per year
                 const years = age -65
                 const percentage = years * .072
                 const value = income * (1 + percentage)
                 return value
              }
        }
      }
}



export const adjustOAS = (age, payment, income) => {
    const oasPayment = payment * (1+  ((age - 65) * 0.072))
    const overage = income > 75000 ? income - 75000 : 0
    const clawback = overage * .15 
    return oasPayment - clawback > 0 ? oasPayment - clawback : 0
   }


const adjustCpp = adjustCppMemoized()

export const calculateCpp = (birthYear, cppStartAge, lifeSpan, main_reducer) =>  {
        const incomeArray = Object.values(main_reducer).filter(d => d.incomeType === "employmentIncome")                                 //convert object containing income streams to array filtering out only CPP contributory Income
        if (incomeArray.length > 0) {
       
            const array = []                                                                                                               // create our array into which income will be pushed
            for (let age = 18; age <= 65; age ++) {                                                                                         //start a for loop to adjust pensionable earnings of each year of users life
             const year = birthYear + age                                                                                                  //determine the year for which we are adjusting earnings
             const unadjustedPensionableEarnings = incomeArray.map(d => age >= d.age1                                                   //map through the income streams to see if there was income in this year
                                                         && age < d.age2 ? 
                                                         d.value : 0                                                                       //If there was pensionable income, give the financial value
                                                         ).reduce((acc, num) => acc + num)                                                 //Sum all financial values of pensionable income earned
         
             const adjustedEarningsPercentage = year < 2019 && age < 70 ?                                                                 //if income was earned before 2020, we need to adjusted it using the history YMPE, if not its the same as the pensionable income above
                                       unadjustedPensionableEarnings / historicYmpe[year] < 1 ?                                            //Next we want to check if the percentage is less than one, if so we want to use it, if not we just want 100%
                                       unadjustedPensionableEarnings / historicYmpe[year] : 1 :
                                       unadjustedPensionableEarnings / fiveYearYMPE < 1 ? unadjustedPensionableEarnings / fiveYearYMPE : 1
              
            const adjustedPensionableEarnings =  adjustedEarningsPercentage * fiveYearYMPE                                                 //This adjusts the users pensionable earnings into todays dollars
            array.push(adjustedPensionableEarnings)                                                                                       //Pushed to the array, giving and adjusted value for each year
         }
         const totalAdjustedPensionableEarnings = array.sort().slice(8,47).reduce((acc, num) => acc + num)                                  //array is sorted and sliced to remove lowest 8 years then summed up
         const averagePensionableEarnings = totalAdjustedPensionableEarnings / 39                                                           //divided by 39, the highest earning years of the client
         const annualCppPayment = averagePensionableEarnings * .25                                                                          //Multiplied by 25%
         const adjustedCppPayment = Math.round(adjustCpp(cppStartAge, (cppStartAge+annualCppPayment), annualCppPayment)/1000)*1000
         const cppIncome = {
            color: "#F29278", 
            age1: cppStartAge, 
            incomeType: "retirementIncome", 
            stream: "CPP Income", 
            id: "cpp_selector", 
            taxable: true, 
            age2: lifeSpan + 1, 
            base: annualCppPayment,
            value: adjustedCppPayment,
        }
         return cppIncome
        }
        else return {
            color: "#F29278", 
            age1: cppStartAge, 
            incomeType: "retirementIncome", 
            stream: "CPP Income", 
            id: "cpp_selector", 
            taxable: true, 
            age2: lifeSpan + 1, 
            base: 0,
            value: 0,
        }            
}




//HELPER FUNCTIONS
export const sum = (age, name, query, reducer) => Object.values(reducer).map(d => d[name] === query 
    && age >= d.age1
    && age < d.age2 ?
    d.value : 0 )
    .reduce((a, n) => a + n)


export const calculateOAS = (age, lifeSpan, income_selector) =>{
  const array = []
   for(let i = 65; i < 85; i++) {
    array.push(sum(i, "taxable", true, income_selector))
   }
 
   const avgIncome = array.reduce((a, n) => a + n) / array.length
    return ({
    color: "#488487", 
    age1: age, 
    incomeType: "retirementIncome", 
    stream: "OAS Income", 
    id: "oas_selector", 
    taxable: true, 
    age2: lifeSpan + 1, 
    base: 7200,
    value: adjustOAS(age, 7200, avgIncome)
})}


//DETERMINE CPP AND OAS PAYMENT AFTER AGE CHANGES





