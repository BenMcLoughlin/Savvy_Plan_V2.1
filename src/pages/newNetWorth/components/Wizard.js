import React from "react"
import RangeBar from "UI/rangeBar/RangeBar"
import ButtonLight from "UI/buttons/ButtonLight"
import ChooseOne from "UI/forms/ChooseOne"
import Input from "UI/forms/Input"
import Select from "UI/forms/Select"
import styled from "styled-components"
import {propertyNames_selector} from "redux/netWorth/netWorth_selectors"
import {connect} from "react-redux"

const Wizard = ({subCategory, category,  count, setState, state, removeItem_action, changeLabel, addItem, setValue, propertyNames_selector}) => {

    const {label} = state

return (
<>
    { 
    count === 0 && subCategory === "cash" || count === 1 && subCategory === "investments"  || count === 1 && subCategory === "property" ||
    count === 0 && subCategory === "shortTerm" || count === 0 && subCategory === "other" 
    ?
    <>
    <Input label="{category} Name" handleChange={(e) => setState({...state, label: e.target.value})} type="text" value={label} name="firstName"/>
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
 : 
  count === 0 && subCategory === "investments" ? 
     <ChooseOne setValue ={(value) => setState({...state, registration: value})} array={["tfsa", "rrsp", "non-registered"]}/>

 : count === 0 && subCategory === "property" ? 
     <ChooseOne setValue ={(value) => setState({...state, registration: value})} array={["rental", "primary residence", "vacation home", "vehicle", "other hard asset"]}/>
 :

 count === 0 && subCategory === "longTerm" ? 
 <>
        <H2>Is it connected to any of these ?</H2>
     <ChooseOne setValue ={(value) => setState({...state, registration: value})} array={(propertyNames_selector.concat("No"))}/>
</>
:
 count === 1 && subCategory === "longTerm" ? 
 <>
        <H2>Is it connected to any of these ?</H2>
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

//-----------------------------------------------STYLES-----------------------------------------------//
const Button = styled(ButtonLight)`
    bottom: 3rem;
    left: 1rem;
    background: red;

`


const H2 = styled.h2`
padding: 1rem;
`