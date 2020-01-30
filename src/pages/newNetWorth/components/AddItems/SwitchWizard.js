import React, {useState} from "react"
import ButtonLight from "UI/buttons/ButtonLight"
import styled from "styled-components"
import ChooseOne from "UI/forms/ChooseOne"
import {Close} from "style/Icons"
import RangeBar from "UI/rangeBar/RangeBar"
import Input from "UI/forms/Input"
import Select from "UI/forms/Select"
import CheckBox from "UI/forms/CheckBox"
import MiniRangeBar from "UI/miniRangeBar/MiniRangeBar"

export const switchControl = (count, state, setState, setValue, changeLabel, addItem, removeItem_action) => {
console.log(count, state.type);
        switch(state.type) {
            case "cash": 
            case "investment":
            case "property":
            {
                        switch(count) {
                                case(0):  return <ChooseOne setValue ={(value) => setState({...state, type: value})} array={["cash", "investments", "property"]}/>
                            }
                            break;
                        }
            case "cash": {
                        switch(count) {
                                case(1): return   <>
                                                    <Input label="Asset Name" handleChange={(e) => setState({...state, label: e.target.value})} type="text" value={state.label} name="firstName"/>
                                                        <RangeBar
                                                        rangeBarProps={state}
                                                        setValue={setValue}
                                                        handleChangeLabel = {changeLabel}
                                                        handleRemoveItem={removeItem_action}
                                                        editable={true}
                                                        labelHidden
                                                        />
                                                        <Button onClick={() => addItem()} text={"Add To Assets"}>Add </Button>
                                                    </>
                              
                            }
                        }
                    break;
            case "investment": {
                        switch(count) {

                                case(1):  return <ChooseOne setValue ={(value) => setState({...state, registration: value})} array={["tfsa", "rrsp", "non-registered"]}/>
                                break;
                            }
                
            }
                   break;
            case "property": {
            switch(count) {
                                case(0): return <ChooseOne setValue ={(value) => setState({...state, registration: value})} array={["rental", "primary residence", "vacation home"]}/>
                                case(1): return  <>
                                                    <Input label="Property Name" handleChange={(e) => setState({...state, label: e.target.value})} type="text" value={state.label} name="firstName"/>
                                                     <h3>Market Value</h3>
                                                    <RangeBar
                                                        rangeBarProps={state}
                                                        setValue={setValue}
                                                        handleChangeLabel = {() => null}
                                                        handleRemoveItem={() => null}
                                                        labelHidden
                                                    />
                                                    <Button onClick={() => addItem()} text={"Add to Assets"}>Add </Button>

                                                </>

                }
                break;
            }
        }

}


const Button = styled(ButtonLight)`
    bottom: 3rem;
    left: 1rem;
    background: red;

`


/*
PROPERTY CASES
                    case(1): return <ChooseOne setValue ={(value) => setState({...state, registration: value})} array={["rental", "primary residence", "vacation home"]}/>
                    case(2): return  <>
                                        <Input label="property Name" handleChange={(e) => setState({...state, label: e.target.value})} type="text" value={state.label} name="firstName"/>
                                        <RangeBar
                                            rangeBarProps={state}
                                            setValue={setValue}
                                            handleChangeLabel = {changeLabel}
                                            handleRemoveItem={removeItem_action}
                                            editable={true}
                                            labelHidden
                                        />
                                
                                    </>
                    case(3): return     <>
                                        <Select selectType='year' label="Purchase Year" handleChange={(e) => setState({...state, purchaseYear: e.target.value})} name={"purchaseYear"} type="text" value={state.purchaseYear} required setValue={((name, value) => setState({...state, [name]: value}))}/>
                                        <Button onClick={() => addItem()} text={"Submit"}>Add </Button>
                                        </>
         
                                        */