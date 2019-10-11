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

    else if (age > 65 && age < 72) {
        const years = age -65
        const percentage = years * .072
        const value = income * (1 + percentage)
        return value
     }

     if (age > 72) {return income * 1.36}
}



