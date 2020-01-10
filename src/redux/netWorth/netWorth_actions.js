import _ from "lodash"

//This action us used to add a new asset or liability to the list. 
export const addItem = (id, text, financialValue, rangeBarValue, section, category) => {
    return {
        type: "ADD_ITEM", 
        payload: {
            id: id, 
            category: category,
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

export const removeItem = (id,  category, section,) => {
    return {
        type: "REMOVE_ITEM", 
        payload: {
            category: category, 
            section: section,
            id: id,
        }
}
}
//uses the item id to remove it from the reducer state

export const setItemValue = (name, financialValue, rangeBarValue, rangeBarProps) => {
    return {
        type: "SET_ITEM_VALUE",
        payload: {
            name: name,
            category: rangeBarProps.category, 
            section: rangeBarProps.section,
            id: rangeBarProps.id,
            financialValue: financialValue,
            rangeBarValue: rangeBarValue
        }
    }
}
// sets the financial value when inputted through the text input. 


export const changeLabel = (event, name, id, category, section) => {
    return {
        type: "CHANGE_LABEL",
        payload: {
            category: category, 
            section: section,
            event: event.target,
            name: name,
            id: id
        }
    }
}

// Changes the label 

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// All Actions related to the NetWorth App