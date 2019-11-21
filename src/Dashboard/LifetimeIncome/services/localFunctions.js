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


const adjustCpp = (income, age) => {
    if (age < 65) {
       const years = 65 - age 
       const percentage = years * .072
       const value = income * (1-percentage)
       return value
    }
    else if (age === 65) {return income}
  
    else if (age > 65) {
        const years = age -65
        const percentage = years * .072
        const value = income * (1 + percentage)
        return value
     }
  }
export const adjustOas = (income, age) => {
    if (age === 65) {return income}
  
    else if (age > 65 && age < 70) {
        const years = age -65
        const percentage = years * .072
        const value = income * (1 + percentage)
        console.log(Math.round(value/100)*100);
        return Math.round(value/100)*100
     }
  
     if (age >= 70) {return income * 1.36}
  }
  

function calculateCppMemoized() {
   let cache = {};
   return function(age,birthYear, cacheKey, cppStartAge, ympe, state) {
        if (cacheKey in cache) {
            console.log('memoized');
            return cache[cacheKey]
        } else {
            console.log('ran the function');
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
                const adjustedCppPayment = Math.round(adjustCpp(annualCppPayment, cppStartAge)/100)*100
                cache[cacheKey] = adjustedCppPayment
                return cache[cacheKey]
        }
   }
}

export const calculateCpp = calculateCppMemoized()


export const calculateStartValue = (age, account, state) => {
    return state[age-1][account].endValue

}
export const calculateEndValue = (startValue, age, account,state) => {
    const {contribution, percentageReturn, withdrawal} = state[age][account]
    return  startValue * (1 + percentageReturn) + contribution - withdrawal

}