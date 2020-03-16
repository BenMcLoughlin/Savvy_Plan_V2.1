export const add_action = (id, state, reducer) => {
  console.log('add_action fired', reducer);
    return ({                                   //this is a global action, it can add an object to any reducer
     type: `${reducer}/ADD`,                                                           //the reducer name is provided by the action telling it which reducer to add too
     payload: {
         id,
         ...state,
     }
 })}

 export const delete_action = (id, reducer) => ({               //deletes an unnested object from a reducer using the id
    type: `${reducer}/DELETE`,
    id,
})
 
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
 
 



 export const setKeyValue_action = (key, reducer, value) => ({       //this sets simple key value pair, for instance if I just want to change birthYear which is a simple object I would use this
     type: `${reducer}/SET_KEY_VALUE`,
     key,
     value
 })
                                
 export const setNestedKeyValue_action = (childKey, parentKey, reducer, value) => ({  //this sets nested key value pair, for instance if I just want to change mini range bar value, which is a nested object
     type: `${reducer}/SET_NESTED_KEY_VALUE`,
     childKey,                                                                        // child key in the key value pair of the object nested within the parent object, 
     parentKey,                                                                       // parent key is the key to the lower level child object
     value
 })
 


 //ACTION WRAPPER FUNCTIONS


 //DELETE INSTANCE -- used to delete objects in an instance array, this is an array of objects that are all related such as earning years of the same income stream
 export const deleteInstance = (id, instance, instanceArray, reducer, setCategory, setId) => {                             //deletes the instance
    if (instance.id === id) {                                                                                              //checks if the instance being deleted and the one currently being displayed are the same
        if (instanceArray.length > 0) {                                                                                    // if the array is greater then one it wil delete the instance and change the id of the instance being displayed
            setId(instanceArray[0].id)                                                                                     // sets the id to the first id in the instance array, this prevents errors, otherwise it wants to display an instance that no longer exists
             delete_action(instance.id, reducer)                                                                                     //removes the instance
        }
        setCategory()                                                                                                      //if its the last item in the array it brings the user back to the main page by setting category and id to false
        setId()
    }
    else {
         delete_action(instance.id, reducer)                                                                                         //if they click to delete an instance that isn't the one being display it won't cause an issue and can just be deleted
    }
}

//SET AGE
export const setAge = (id, instanceArray, name, setNestedKeyValue_action, reducer, value) => {                                        //sets the age, as well as the surrounding ages in the array of instances
    const ageType = name === "bottom" ? "fromAge" : "toAge"                                                                //checks what range bar is being changed in the dual range bar
    setNestedKeyValue_action(ageType, id, reducer, value) 
    if (ageType === "fromAge" ) {                                                                                          //if its "from age" we want to change the age and the "to age " of the instance before it
        const currentInstanceId = instanceArray.findIndex(d => d.id === id)                                                //we're finding the index of this item in the instance array
       console.log(currentInstanceId)
        if (currentInstanceId > 0) {                                                                                       //if the position is higher then one we want to change the "to Age" of the instance before
            const lastInstanceId = instanceArray[currentInstanceId - 1].id                                                 //findst the id of the instance before 
            setNestedKeyValue_action( "toAge", lastInstanceId, reducer, value)                                                        //changes the "to Age" of the instance before
        } 
    }
    if (ageType === "toAge" ) {
        const currentInstanceId = instanceArray.findIndex(d => d.id === id)                                                //same as above but changes the "from age" of the instance after
        if (currentInstanceId !== instanceArray.length - 1) {
            const nextInstanceId = instanceArray[currentInstanceId + 1].id
            setNestedKeyValue_action("fromAge", nextInstanceId, reducer, value)   
        } 
    }
}