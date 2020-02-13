import {SIGN_IN, SIGN_OUT} from "./type"

import _ from "lodash"

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId,
    }
}
export const signOut = () => {
    return {
        type: SIGN_OUT,
    }
}

//------NET WORTH CALCULATOR ACTIONS=-----------------------------//

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
