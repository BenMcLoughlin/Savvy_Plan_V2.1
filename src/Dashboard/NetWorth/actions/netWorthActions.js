import _ from "lodash"

//This action us used to add a new asset or liability to the list. 
export const addItem = (text, financialValue, rangeBarValue, section, catagory) => {
    return {
        type: "ADD_ITEM", 
        payload: {
            id: (Math.random()*10000), 
            catagory: catagory,
            section: section, 
            name: _.camelCase(text),
            label: text, 
            rangeBarValue: rangeBarValue,
            financialValue: financialValue,
    }
}
}
//gathers all the details from the AddNewItem container and sends these details as an object called payload
// to the reducer. The reducer uses the details contained in this object to place the new object in the correct positionn. 

export const removeItem = (id,  catagory, section,) => {
    return {
        type: "REMOVE_ITEM", 
        payload: {
            catagory: catagory, 
            section: section,
            id: id,
        }
}
}
//uses the item id to remove it from the reducer state

export const setVariable = (event, catagory, section, logValue) => {
    return {
        type: "SET_VARIABLE",
        payload: {
            catagory: catagory, 
            section: section,
            event: event.target,
            financialValue: logValue,
            rangeBarValue: event.target.value
        }
    }
}
// sets the financial value when inputted through the text input. 

export const setRangeBarValue = (event, catagory, section, rangeBarValue) => {
    return {
        type: "SET_RANGEBAR_VALUE",
        payload: {
            catagory: catagory, 
            section: section,
            event: event.target,
            financialValue: event.target.value,
            rangeBarValue: rangeBarValue
        }
    }
}

// sets the financial value when inputted through the rangebar input. 

export const changeLabel = (event, catagory, section) => {
    return {
        type: "CHANGE_LABEL",
        payload: {
            catagory: catagory, 
            section: section,
            event: event.target
        }
    }
}

// Changes the label 

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// All Actions related to the NetWorth App