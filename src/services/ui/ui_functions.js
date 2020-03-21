import { useState, useEffect, useRef } from 'react';

//CHANGES THE NAME OF ALL INSTANCES IN A STREAM
export const editStreamName = (e, id, instanceArray, setNestedKeyValue_action, setStream, reducer) => {                                                                                               //enables the user to change the label which changes all income stream labels of that stream
    const {value} = e.target                                                                                               //destructure out the value from the target event
   console.log(instanceArray);
    if(value.length === 0) return                                                                                          //when the text is 0 we don't want it to change the categoruy because the box will close as its seen as a false value
    for (let i = 0; i < instanceArray.length; i++) {                                                                       //we loop through and change the label for every income stream in the stream
        setNestedKeyValue_action("stream", instanceArray[i].id, reducer, value)                                            //changes the label
        if(value.length > 0) {                                     //(childKey, parentKey, reducer, value)                                                         // if the lenth is greater then 0 it changes the stream, the stream is determining what is visible
            setNestedKeyValue_action("stream", instanceArray[i].id, reducer, value)
        }
       }
        setStream(e.target.value)                                                                                        //sets the stream
}

//SET AGE OF DUAL RANGE BAR, LESSER AGE CANT BE ABOVE HIGHER AGE
export const setAge = (id, instanceArray, name, setNestedKeyValue_action, reducer, value) => {                             //sets the age, as well as the surrounding ages in the array of instances
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
