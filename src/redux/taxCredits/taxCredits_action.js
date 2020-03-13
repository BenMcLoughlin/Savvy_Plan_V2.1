export const addTaxCredit_action = (id, state) => {
    return ({
     type: "tax_reducer/ADD",
     payload: {
         id,
         ...state,
     }
 })}
 
 export const taxCreditsValue_action = (id, financialValue, rangeBarValue, {name}) => ({
     type: "taxCredits/CHANGE_INCOME",
     id, 
     name,
     financialValue,
     rangeBarValue
 })
 export const changeLabel_action = (id, key, event) => ({
     type: "taxCredits/CHANGE_LABEL",
     id, 
     key,
     event
 })
 
 
 
 export const taxCreditsAge_action = (id, ageType, value) => {
     console.log(ageType);
     return ({
     type: "taxCredits/CHANGE_AGE",
     id, 
     ageType,
     value
 })}
 
 export const deleteTaxCredits_action = (id) => ({
     type: "taxCredits/DELETE",
     id,
 })
 
 
 
 