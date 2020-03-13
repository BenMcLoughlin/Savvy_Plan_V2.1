export const add_action = (id, state, reducer) => {
  console.log('add_action fired', reducer);
    return ({                                   //this is a global action, it can add an object to any reducer
     type: `${reducer}/ADD`,                                                           //the reducer name is provided by the action telling it which reducer to add too
     payload: {
         id,
         ...state,
     }
 })}

 
 export const setValue_action = (id, financialValue, rangeBarValue, {name}, reducer) =>  ({
     type: `${reducer}/SET_VALUE`,
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
 
 
 export const setAge_action = (ageType, id, reducer, value) => {
console.log(id);
 return ({
     type:  `${reducer}/SET_AGE`,
     id, 
     ageType,
     value
 })}
 
 export const delete_action = (id, reducer) => ({
     type: `${reducer}/DELETE`,
     id,
 })
 
 