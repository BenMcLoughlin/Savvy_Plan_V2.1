import React, {useState, useEffect} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import ChooseOne from "UI/forms/ChooseOne"
import FormInput  from "UI/forms/Input"
import DateInput from "UI/forms/DateInput"
import RangeBar  from "UI/rangeBar/RangeBar"
import MiniRangeBar  from "UI/miniRangeBar/MiniRangeBar"
import ButtonLight from "UI/buttons/ButtonLight"
import {addItem_action} from "redux/netWorth/netWorth_actions"
import {propertyNames_selector} from "redux/netWorth/netWorth_selectors"
import _ from "lodash"
import {individualItem_data} from "pages/netWorth/data/netWorth_data"
import {renderSavings, optimizedWithdrawals} from "services/savings/savings_functions"
import {transaction_action, setOpitmizedValues_action} from "redux/savings/savings_actions"
import {savings_reducer} from "redux/savings/savings_reducer"
import {rate1, rate2} from "redux/assumptions/assumptions_selectors"
import {setIncome_action, calculateCpp_action} from "redux/income/income_actions"
import Add from "UI/buttons/Add"
//THe add form is used to add individual items to the users net worth.

const AddIncome = ({addItemToList, setFromAge, setToAge}) => {    
  
    const [addForm, setAddForm] = useState(false)  
    
    const initialState = {
        label: "",
        income: {
            isChecked: "",
            contributeToCpp: true,
            financialValue: 0, 
            label: "Income Value",
            name: "",
            rangeBarValue: 0, 

        },
            startAge: {
                rangeBarValue: 20,
                name: "startAge",
                max: 80,
                min: 0,
                step: 1,
                label: "Starts at Age",                                                                                           //The label is different for different types of categories
            },
            endAge: {
                rangeBarValue: 40,
                name: "endAge",
                max: 80,
                min: 0,
                step: 1,
                label: "Finishes at Age",                                                                                           //The label is different for different types of categories
            }
    }

 
    const [state, setState] = useState({...initialState})

    const setAgeValue = (value, value2, {name}) => {
        setState({...state, [name]: {
            ...state[name], rangeBarValue: value
        }})
        name === "startAge" ? setFromAge(state.startAge.rangeBarValue) :  setToAge(state.endAge.rangeBarValue)
    }

    const setValue = (logValue, rangeBarValue, rangeBarProps) => {
        setState({...state, income: {
                        ...state.income, 
                                    financialValue: logValue,
                                    rangeBarValue: rangeBarValue
        }
        })
    }

    const handleClickToAddNewItem = () => {
        addItemToList(state.label, state.income) 
        setState({...initialState})
        setAddForm(false)
      }

    const handleSetName = (e) => {
        setState({...state, 
            label: e.target.value,
            income: {
            ...state.income, 
                        name: _.camelCase(e.target.value)
      }})
    }
  

      
    return (
        <>
        {
            addForm ? 
            <>

<Blackout/>
            <Container>                                                                     
            <Left>                                                                                                  {/* Choose one is used to select the account type */}
                    <ChooseOne
                            array={["employment Income", "business income", "rental income", "pension income"]}  //if it is secored (a mortgage) it has to be linked to the property its secured against
                            setValue={(value) => setState({...state, registration: value.toLowerCase()})}
                            value ={1}
                        />
                </Left>
                <Center>
                    <FormInput
                        label="Income name"
                        value={state.income.name}
                        type={"text"}
                        handleChange={(e) => setState({...state, income: {...state.income, name: e.target.value}})}                                   //sets the state in the local state
                    />
                <RangeBar 
                        rangeBarProps={state.income}                                                                      //Every Add item has a range bar to set its value
                        setValue={setValue}                 
                    /> 

                </Center>
                <Right>
                    <MiniRangeBarWrapper>
                            <MiniRangeBar 
                            rangeBarProps={state.startAge}
                            setValue={setAgeValue}
                            />   
                            <MiniRangeBar 
                            rangeBarProps={state.endAge}
                            setValue={setAgeValue}
                                    />           
                    </MiniRangeBarWrapper>
                    <ButtonWrapper>
                            <ButtonLight 
                                text={"Add"}
                                onClick={() => handleClickToAddNewItem()}
                            />
                    </ButtonWrapper>
                    <ButtonLeftWrapper>
                            <ButtonLight 
                                text={"Back"}
                                onClick={() => setAddForm(false)}
                            />
                    </ButtonLeftWrapper>
                </Right>
            </Container>
            </>
        
            :   
            <AddWrapper>
            <Add
                onClick={() => setAddForm(true)}
                />
            </AddWrapper>
    
    
        }
        </>
    )

}

const mapStateToProps = (state) => ({
    propertyNames_selector: propertyNames_selector(state),
    user_reducer: state.user_reducer,
    savings_reducer: state.savings_reducer,
    rate1: rate1(state),
    rate2: rate2(state),
})

export default connect(mapStateToProps, {addItem_action, transaction_action, setOpitmizedValues_action})(AddIncome )


//-----------------------------------------------STYLES-----------------------------------------------//


const Left = styled.div`
    width: 30rem;
    height: 100%;
    padding: 2rem;
`
const ButtonWrapper = styled.div`
    position: absolute;
    bottom: 0rem;
    right: 2rem;
`
const ButtonLeftWrapper = styled.div`
    position: absolute;
    bottom: 0rem;
    left: 2rem;
`
const MiniRangeBarWrapper = styled.div`
    position: absolute;
    right: 3rem;
    top: 1rem;
`
const Right = styled.div`
    width: 30rem;
    padding: 2rem;
`
const Center = styled.div`
    width: 45rem;
    padding: 2rem;
`
const Blackout = styled.div`
    background: black;
    opacity: .5;
    position: absolute;
    top: -44rem;
    left: -30rem;
    height: 100rem;
    width: 110vw;
`
const Container = styled.div`
    width: 94rem;
    border-radius: 5px;
    overflow: hidden;
    height: ${props => props.subCategory === "securedDebt" ? "33rem" : "30rem"};                                                    //mortgage requires more height because there are more inputs
    border: ${props => props.theme.border.primary};
    position: absolute;
    top: -20rem;
    left: 10rem;
    display: flex;
    background: ${props => props.theme.color.ice};
    z-index: 500;

`



const  AddWrapper = styled.div`
width: 18rem;
`
