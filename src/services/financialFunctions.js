
export const calculateFutureValue = (rate, n, pmt, pv) => {
  const FutureValue = pmt * (Math.pow((1+rate), n) - 1)/rate + pv * Math.pow((1+rate), n)
  return Math.round(FutureValue/1000)*1000
}

// export const financeFV = (rate, cf0, numOfPeriod) => {
//   var rate = rate/100, fv;
//   fv = cf0 * Math.pow((1 + rate), numOfPeriod);
//   return Math.round(fv * 100) / 100;
// };



const RRIFMinimumTable = {
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


export const calculateRRIFPaymentTable = (age, balance, returnOnInvestment) => {
    const withdrawalTable = [

    ]
    for (let i = 0; i < (96-age); i++) {

        if (withdrawalTable.length < 1) {

            const rate = RRIFMinimumTable[age]
            const startingBalance = balance * (1 + returnOnInvestment)
            const withdrawal = startingBalance * rate

            withdrawalTable.push({
                age: age,
                startingBalance: startingBalance,
                rate: RRIFMinimumTable[age],
                withdrawal: Math.round(withdrawal/1000)*1000,
                endingBalance: startingBalance - withdrawal, 
                
            })
        }
        else {
            const startingBalance = withdrawalTable[i - 1].endingBalance * (1 + returnOnInvestment)
            const rate = RRIFMinimumTable[i + age]
            const withdrawal = startingBalance * rate
            const endingBalance = startingBalance - withdrawal

            withdrawalTable.push({
                age: i + age,
                startingBalance: Number(startingBalance.toFixed()),
                rate: rate,
                withdrawal: Math.round(withdrawal/1000)*1000,
                endingBalance: Number(endingBalance.toFixed()), 
            })
        }
    }
    return withdrawalTable
}




export const adjustCPP = (income, age) => {
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
export const adjustOAS = (income, age) => {
  if (age === 65) {return income}

  else if (age > 65 && age < 70) {
      const years = age -65
      const percentage = years * .072
      const value = income * (1 + percentage)
      return value
   }

   if (age >= 70) {return income * 1.36}
}



