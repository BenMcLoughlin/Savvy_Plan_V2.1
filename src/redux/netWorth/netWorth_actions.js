import _ from "lodash"


export const setItemValue_action = (logValue, rangeBarValue, category, rangeBarProps, itemId) => {
        console.log(itemId);
        return ({
        type: "netWorth_reducer/SET_ITEM_VALUE",
        id: itemId,
        name: rangeBarProps.name,
        category: category,
        financialValue: logValue,
        rangeBarValue,
        rangeBarProps
})}

export const changeLabel_action = (e, rangeBarProps, itemId) => ({
        type: "netWorth_reducer/CHANGE_LABEL",
        id: itemId,
        label: e.target.value,
        category: rangeBarProps.category,
        rangeBarProps
})

export const removeItem_action = (rangeBarProps) => ({
        type: "netWorth_reducer/REMOVE_ITEM",
        id: rangeBarProps.id,
        category: rangeBarProps.category,
})




export const addItem_action = (id, state) => {
       return ({
        type: "netWorth_reducer/ADD_ITEM",
        payload: {
                id: id,
                ...state,
        } 
})}




