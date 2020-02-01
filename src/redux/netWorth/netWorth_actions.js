import _ from "lodash"


export const setItemValue_action = (logValue, rangeBarValue, rangeBarProps) => ({
        type: "netWorth_reducer/SET_ITEM_VALUE",
        id: rangeBarProps.id,
        category: rangeBarProps.category,
        financialValue: logValue,
        rangeBarValue,
        rangeBarProps
})

export const changeLabel_action = (e, rangeBarProps) => ({
        type: "netWorth_reducer/CHANGE_LABEL",
        id: rangeBarProps.id,
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
        console.log(state);
       return ({
        type: "netWorth_reducer/ADD_ITEM",
        payload: {
            subCategory: state.subCategory,
            id: id,
            financialValue: state.financialValue,
            rangeBarValue: state.rangeBarValue,
            category: state.category,
            registration:  state.registration,
            label:  state.label
        }
})}




