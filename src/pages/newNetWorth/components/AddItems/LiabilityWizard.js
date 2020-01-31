import React from "react"
import RangeBar from "UI/rangeBar/RangeBar"
import ButtonLight from "UI/buttons/ButtonLight"
import ChooseOne from "UI/forms/ChooseOne"
import Input from "UI/forms/Input"
import {connect} from "react-redux"
import styled from "styled-components"
import {propertyNames_selector} from "redux/netWorth/netWorth_selectors"

const Wizard = ({count, setState, state, removeItem_action, changeLabel, addItem, propertyNames_selector, setValue}) => {

    console.log(propertyNames_selector)
return (
<>
    { count === 0 ? 
         <ChooseOne setValue ={(value) => setState({...state, type: value})} array={["shortTerm", "other", "longTerm"]}/>
    :
    count === 1 && state.type === "shortTerm" || count === 1 && state.type === "other"  || count === 2 && state.type === "longTerm" ?
    <>
    <Input label="Asset Name" handleChange={(e) => setState({...state, label: e.target.value})} type="text" value={state.label} name="firstName"/>
         <RangeBar
         rangeBarProps={state}
         setValue={setValue}
         handleChangeLabel = {changeLabel}
         handleRemoveItem={removeItem_action}
         editable={true}
         labelHidden
         />
         <Button onClick={() => addItem()} text={"Submit"}>Add </Button>
     </>

 : count === 1 && state.type === "longTerm" ? 
 <>
        <h2>Is it connected to any of these ?</h2>
     <ChooseOne setValue ={(value) => setState({...state, registration: value})} array={(propertyNames_selector.concat("No"))}/>
</>
    :
 null}
 </>
 )
    
}

const mapStateToProps = (state) => ({
    propertyNames_selector: propertyNames_selector(state)
})


export default connect(mapStateToProps)(Wizard)

const Button = styled(ButtonLight)`
    bottom: 3rem;
    left: 1rem;
    background: red;

`


