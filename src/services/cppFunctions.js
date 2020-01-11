//DETERMINE CPP AND OAS PAYMENT AFTER AGE CHANGES

function adjustCppMemoized() {                                                                      //CPP is either increased or reduced according to the age the user takes it
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

export const adjustCpp = adjustCppMemoized()




function adjustOasMemoized() {                                                                      //OAS is  also either increased or reduced 
    let cache = {};                             
    return function( age, cacheKey, income) { 
        if (cacheKey in cache) {
            return cache[cacheKey]                                                                  //it can only begin at age 65 so there is no reduction if taken earlier because the user cant
        } else {
            if (age === 65) {return income}
  
            else if (age > 65 && age <= 70) {                                                       //anything above age 65 is increased each year
                const years = age -65
                const percentage = years * .072
                const value = income * (1 + percentage)
                return Math.round(value/100)*100
             }
          
             if (age > 70) {return income * 1.36}                                                    //The largest increase possible is 36%, if the user is over 70 it's just increased by that amount.
        }
      }
}

export const adjustOas = adjustOasMemoized()



function calculateCppMemoized() {
    let cache = {};
    return function(age,birthYear, cacheKey, cppStartAge, ympe, state) {
         if (cacheKey in cache) {
             return cache[cacheKey]
         } else {
             const pensionableIncome  = Object.values(state).slice(0,53).map(d => {
 
                 const pensionableIncome = Object.values(d).filter(d => d.contributeToCpp)
                                                         .map(d => d.financialValue)
                                                         .reduce((acc, num) => acc + num)
                  
                     const currentAge = Object.values(d)[0].age
                     const currentYear = currentAge + birthYear
                     const percentage = currentYear < 2019 && currentAge <= 70 ? 
                                                 pensionableIncome / historicYmpe[birthYear + currentAge] < 1 ? 
                                                  pensionableIncome / historicYmpe[birthYear + currentAge] : 1 :
                                                 pensionableIncome / ympe < 1 ? pensionableIncome / ympe : 1
     
                     return { adjustedPensionableIncome: percentage * ympe,}})
                                 
                 const  totalAdustedPensionableEarnings =  Object.values(pensionableIncome)
                                                                 .map(d => d.adjustedPensionableIncome)
                                                                 .sort().slice(8,47)
                                                                 .reduce((acc, num) => acc + num)
             
                 const averagePensionableEarnings = totalAdustedPensionableEarnings / 39
                 const annualCppPayment = averagePensionableEarnings * .25
                 const adjustedCppPayment = Math.round(adjustCpp(cppStartAge, (cppStartAge+annualCppPayment), annualCppPayment)/1000)*1000
                 cache[cacheKey] = adjustedCppPayment
                 return cache[cacheKey]
         }
    }
 }
 
 export const calculateCpp = calculateCppMemoized()
 


//CALCULATE AND INSERT CPP AND OAS INCOME INTO REDUCER
export const renderCPPandOASIncome = (cacheKey, calculateCpp_action, cppStartAge, oasStartAge, setIncome_action) => {                   //caclualtes the cpp and oas payments and places them into the income_reducer               
    for (let age = cppStartAge; age <= 95; age++) {
          calculateCpp_action(age, cppStartAge, cacheKey)                                                                                //to support memoization we are passing in the financial value as a caheKey which the funciton will use to know if it's ran before
      }                                                                                                                                  //the actual calculation of the CPP payment is done in the reducer to solve an async issue
    for (let age = 59; age < cppStartAge; age++) {                                                                                       //resets cpp payments to 0 before the selected start age
          setIncome_action(age, false, 0, "CPP Income", "cppIncome")                                                                     //When the user slides the age up, all the income inputted into the reducer below that age has to be removed
      }
    for (let age = oasStartAge; age <= 95; age++) {                                                                                      //sets OasIncome in the reducer using the above process
          setIncome_action(age, false, 7000, "OAS Income", "oasIncome", 0)  
      }
    for (let age = 59; age < oasStartAge; age++) {
          setIncome_action(age, false,  0, "OAS Income", "oasIncome", 0)  
      }
} 

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