import React from "react"
import RangeBar from "UI/rangeBar/RangeBar"
import ButtonLight from "UI/buttons/ButtonLight"
import ChooseOne from "UI/forms/ChooseOne"
import Input from "UI/forms/Input"
import Select from "UI/forms/Select"
import styled from "styled-components"


const Wizard = ({count, setState, state, removeItem_action, changeLabel, addItem, purchasePrice, setPurchasePriceValue, setValue}) => {

    return (
        () => {switch(state.type) {

            case "cash": return () => {
                    switch(count) {
                            case 1: return {"hi"}
                        }
            }
            case "investments": return () =>  {
                switch(count) {
                    case 1: 
                }
            }
            case "cash": return () =>  {
                switch(count) {
                    case 1: 
                }
            }

        }
        })
        

}

export default Wizard


const Button = styled(ButtonLight)`
    bottom: 3rem;
    left: 1rem;
    background: red;

`


