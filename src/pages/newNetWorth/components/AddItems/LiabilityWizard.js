import React from "react"
import RangeBar from "UI/rangeBar/RangeBar"
import ButtonLight from "UI/buttons/ButtonLight"
import ChooseOne from "UI/forms/ChooseOne"
import Input from "UI/forms/Input"
import Select from "UI/forms/Select"
import styled from "styled-components"


const Wizard = ({count, setState, state, removeItem_action, changeLabel, addItem, purchasePrice, setPurchasePriceValue, setValue}) => {

return (
<>
    { count === 0 ? 
         <ChooseOne setValue ={(value) => setState({...state, type: value})} array={["shortTerm", "longTerm", "other"]}/>
    :
    count === 1 && state.type === "shortTerm" || count === 2 && state.type === "investments"  ?
    <>
    <Input label="Liability Name" handleChange={(e) => setState({...state, label: e.target.value})} type="text" value={state.label} name="firstName"/>
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
 :  count === 1 && state.type === "investments" ? 
     <ChooseOne setValue ={(value) => setState({...state, registration: value})} array={["tfsa", "rrsp", "non-registered"]}/>

 : count === 1 && state.type === "property" ? 
     <ChooseOne setValue ={(value) => setState({...state, registration: value})} array={["rental", "primary residence", "vacation home"]}/>
 : count === 2 && state.type === "property" ? 
 <>
     <Input label="property Name" handleChange={(e) => setState({...state, label: e.target.value})} type="text" value={state.label} name="firstName"/>
     <RangeBar
         rangeBarProps={purchasePrice}
         setValue={setPurchasePriceValue}
         handleChangeLabel = {changeLabel}
         handleRemoveItem={removeItem_action}
         editable={true}
         labelHidden
     />
     <RangeBar
         rangeBarProps={state}
         setValue={setValue}
         handleChangeLabel = {changeLabel}
         handleRemoveItem={removeItem_action}
         editable={true}
         labelHidden
     />

 </>
 
 :  count === 3 && state.type === "property" ? 
    <>
    <Select selectType='year' label="Purchase Year" handleChange={(e) => setState({...state, purchaseYear: e.target.value})} name={"purchaseYear"} type="text" value={state.purchaseYear} required setValue={((name, value) => setState({...state, [name]: value}))}/>
    <Button onClick={() => addItem()} text={"Submit"}>Add </Button>
    </>
    :
 null}
 </>
 )
    
}

export default Wizard


const Button = styled(ButtonLight)`
    bottom: 3rem;
    left: 1rem;
    background: red;

`


