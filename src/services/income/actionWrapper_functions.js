


export const setAge = (changeAge_action, id, instanceArray, name, value) => {                                                                                          //sets the age, as well as the surrounding ages in the array of instances
   console.log(instanceArray);
   console.log(id);
    const ageType = name === "bottom" ? "fromAge" : "toAge"                                                                //checks what range bar is being changed in the dual range bar
    changeAge_action(id, ageType, value)
    if (ageType === "fromAge" ) {                                                                                          //if its "from age" we want to change the age and the "to age " of the instance before it
        const currentInstanceId = instanceArray.findIndex(d => d.id === id)                                                //we're finding the index of this item in the instance array
       console.log(currentInstanceId)
        if (currentInstanceId > 0) {                                                                                     //if the position is higher then one we want to change the "to Age" of the instance before
            const lastInstanceId = instanceArray[currentInstanceId - 1].id                                                 //findst the id of the instance before 
            changeAge_action(lastInstanceId, "toAge", value)                                                               //changes the "to Age" of the instance before
        } 
    }
    if (ageType === "toAge" ) {
        const currentInstanceId = instanceArray.findIndex(d => d.id === id)                                               //same as above but changes the "from age" of the instance after
        if (currentInstanceId !== instanceArray.length - 1) {
            const nextInstanceId = instanceArray[currentInstanceId + 1].id
            changeAge_action(nextInstanceId, "fromAge", value)
        } 
    }
}