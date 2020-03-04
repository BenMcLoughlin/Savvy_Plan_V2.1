

export const spendingData = () => {
    const array = []
    for (let age = 18; age < 95; age++) {
        const item = {
            age: age,
            housingCosts: 2000,
            transportationCosts: 2200, 
            lifestyleCosts: 400,
            largeEventsCosts: 700
        }
        array.push(item)
    }
    return array
}
  