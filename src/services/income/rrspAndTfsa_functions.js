

//RETURNS THE MAXIMUM PAYMENTS THE USER COULD RECEIVE FROM RRSP AND TFSA GIVEN THEIR CONTRIBUTION ROOM

function calculateOptimumIncomeStreamsMemoized() {
    let cache = {};
    return function(cacheKey, highestIncomes, maxRrspPayment, maxTfsaPayment, pensionIncome, retirementIncome) {
        // console.log(`
        // cacheKey: ${cacheKey}
        // highestIncomes: ${highestIncomes}
        // maxRrspPayment: ${maxRrspPayment}
        // maxTfsaPayment: ${maxTfsaPayment}
        // pensionIncome: ${pensionIncome}
        // retirementIncome: ${retirementIncome}
        // `);
        if (cacheKey in cache) 
            return cache[cacheKey]
            else {
            
            
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

}
}

export const calculateOptimumIncomeStreams = calculateOptimumIncomeStreamsMemoized()


function addRetirementIncomeMemoized() {
    let cache = {};

    return function addRetirementIncome (cacheKey, incomeStreams, rrspStartAge, tfsaStartAge, setIncome_action) {

        if (cacheKey in cache) 
        return cache[cacheKey]
        else {
            for (let age = 50; age < rrspStartAge; age++ ) {
                setIncome_action(age, false, 0, "RRSP Income", "rrsp", 0) 
            
            }
            for (let age = rrspStartAge; age <= 95; age++ ) {
                setIncome_action(age, false, Math.round(incomeStreams.rrsp/1000)*1000, "RRSP Income", "rrsp", 0) 
            
            }
            for (let age = 50 ; age < tfsaStartAge; age++ ) {
                setIncome_action(age, false, 0, "TFSA Income", "tfsa", 0) 
                setIncome_action(age, false, 0, "Non reg Income", "nonRegistered", 0) 
            }
            for (let age = tfsaStartAge; age <= 95; age++ ) {
                setIncome_action(age, false, Math.round(incomeStreams.tfsa/1000)*1000, "TFSA Income", "tfsa", 0) 
                setIncome_action(age, false, Math.round(incomeStreams.nonRegistered/1000)*1000, "Non reg Income", "nonRegistered", 0) 
            }
        }

        }
        
}







export const addRetirementIncome = addRetirementIncomeMemoized()
