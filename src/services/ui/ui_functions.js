import { useState, useEffect, useRef } from 'react';

//CHANGES THE NAME OF ALL INSTANCES IN A STREAM
export const editStreamName = (e, income_selector, viewStream, setNestedKeyValue_action, setKeyValue_reducer, reducer) => {                                                                                               //enables the user to change the label which changes all income stream labels of that stream
    const {value} = e.target                                                                                               //destructure out the value from the target event
   const instanceArray =  Object.values(income_selector).filter(d => d.stream === viewStream)
    if(value.length === 0) return                                                                                          //when the text is 0 we don't want it to change the categoruy because the box will close as its seen as a false value
    for (let i = 0; i < instanceArray.length; i++) {                                                                       //we loop through and change the label for every income stream in the stream
        setNestedKeyValue_action("stream", instanceArray[i].id, reducer, value)                                            //changes the label
        if(value.length > 0) {                                     //(childKey, parentKey, reducer, value)                                                         // if the lenth is greater then 0 it changes the stream, the stream is determining what is visible
            setNestedKeyValue_action("stream", instanceArray[i].id, reducer, value)
        }
       }
       setKeyValue_reducer("viewStream", "ui_reducer", e.target.value)                                                                                        //sets the stream
}



//SET AGE OF DUAL RANGE BAR, LESSER AGE CANT BE ABOVE HIGHER AGE
export const setAge = (id, instanceArray, name, setNestedKeyValue_action, reducer, value) => {                             //sets the age, as well as the surrounding ages in the array of instances
    const ageType = name === "bottom" ? "age1" : "age2"                                                                      //checks what range bar is being changed in the dual range bar
    //const viewStream = income_selector[id].stream
    //const instanceArray =  Object.values(income_selector).filter(d => d.stream === viewStream).sort((a,b) => a.age1 - b.age1)   

    setNestedKeyValue_action(ageType, id, reducer, value) 
    if (ageType === "age1" ) {                                                                                              //if its "from age" we want to change the age and the "to age " of the instance before it
        const currentInstanceId = instanceArray.findIndex(d => d.id === id)                                                 //we're finding the index of this item in the instance array
        if (currentInstanceId > 0) {                                                                                        //if the position is higher then one we want to change the "to Age" of the instance before
            const lastInstanceId = instanceArray[currentInstanceId - 1].id                                                  //findst the id of the instance before 
            setNestedKeyValue_action( "age2", lastInstanceId, reducer, value)                                                        //changes the "to Age" of the instance before
        } 
    }
    if (ageType === "age2" ) {
        const currentInstanceId = instanceArray.findIndex(d => d.id === id)                                                //same as above but changes the "from age" of the instance after
        if (currentInstanceId !== instanceArray.length - 1) {
            const nextInstanceId = instanceArray[currentInstanceId + 1].id
            setNestedKeyValue_action("age1", nextInstanceId, reducer, value)   
        } 
    }
}


export function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });
    return { ref, isComponentVisible, setIsComponentVisible };
}


 //DELETE INSTANCE -- used to delete objects in an instance array, this is an array of objects that are all related such as earning years of the same income stream
 export const deleteInstance = (delete_action, id, localId, instanceArray, reducer, setKeyValue_action) => {       //deletes the instance

   if (localId === id) {                                                                                                       //checks if the instance being deleted and the one currently being displayed are the same
        {                                                                                                                    // if the array is greater then one it wil delete the instance and change the id of the instance being displayed
             setKeyValue_action("viewId", "ui_reducer", instanceArray[0].id)                                                // sets the id to the first id in the instance array, this prevents errors, otherwise it wants to display an instance that no longer exists
             delete_action(id, reducer)   
            }                                                                                                                                                                                            //if its the last item in the array it brings the user back to the main page by setting category and id to fals
    }

    else {
         delete_action(id, reducer)                                                                                              //if they click to delete an instance that isn't the one being display it won't cause an issue and can just be deleted
    }
}
