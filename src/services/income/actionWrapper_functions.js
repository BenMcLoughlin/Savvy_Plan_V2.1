


export const setAge = (id, instanceArray, name, setAge_action, reducer, value) => {                                        //sets the age, as well as the surrounding ages in the array of instances
    const ageType = name === "bottom" ? "age1" : "age2"                                                                //checks what range bar is being changed in the dual range bar
    setAge_action(ageType, id, reducer, value)
    if (ageType === "age1" ) {                                                                                          //if its "from age" we want to change the age and the "to age " of the instance before it
        const currentInstanceId = instanceArray.findIndex(d => d.id === id)                                                //we're finding the index of this item in the instance array
       console.log(currentInstanceId)
        if (currentInstanceId > 0) {                                                                                       //if the position is higher then one we want to change the "to Age" of the instance before
            const lastInstanceId = instanceArray[currentInstanceId - 1].id                                                 //findst the id of the instance before 
            setAge_action("age2", lastInstanceId,  reducer, value)                                                         //changes the "to Age" of the instance before
        } 
    }
    if (ageType === "age2" ) {
        const currentInstanceId = instanceArray.findIndex(d => d.id === id)                                                //same as above but changes the "from age" of the instance after
        if (currentInstanceId !== instanceArray.length - 1) {
            const nextInstanceId = instanceArray[currentInstanceId + 1].id
            setAge_action( "age1", nextInstanceId, reducer, value)
        } 
    }
}