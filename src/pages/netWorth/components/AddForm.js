import React, {useState, useEffect} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import ChooseOne from "UI/forms/ChooseOne"
import FormInput  from "UI/forms/Input"
import DateInput from "UI/forms/DateInput"
import RangeBar  from "UI/rangeBar/RangeBar"
import MiniRangeBar  from "UI/miniRangeBar/MiniRangeBar"
import ButtonLight from "UI/buttons/ButtonLight"
import {add_action} from "redux/actions"
import {propertyNames_selector} from "redux/netWorth/netWorth_selectors"
import {netWorthInstance_data} from "pages/netWorth/data/netWorth_data"


//THe add form is used to add individual items to the users net worth.

const AddForm = ({category, subCategory, user_reducer, savings_reducer, setAddFormSubCategory, accountTypeArray, bookValueLabel, currentValueLabel, interestRateLabel, add_action, propertyNames_selector, parent}) => {    


    const newInstance = netWorthInstance_data(bookValueLabel, category, currentValueLabel, interestRateLabel, accountTypeArray[0], subCategory)     //initial State is found in data 

    const [state, setState] = useState({...newInstance})
 
    useEffect(() => {                                                                                                         //ensures state is updated on every page change
        setState({...newInstance, subCategory: subCategory})
    }, [subCategory])

    const setValue = (logValue, rangeBarValue, rangeBarProps) => {                                                             //receives numbers from range bar and sets them in state
        setState({...state, [rangeBarProps.name]: {
                                ...state[rangeBarProps.name], 
                                        financialValue: logValue,
                                        rangeBarValue: rangeBarValue
    }})
    }

    const setDate = (event) => {
        setState({...state, startDate: {                                                                                      //used to store the date added in the mortgage section
                                ...state.startDate, 
                                         date: event.target.value
    }})
    }


    const addItem = () => {                                                                                                   //Adds the item to the reducer
        setAddFormSubCategory(false)
        const id = (Math.random() * 10000000000).toFixed()                                                                    // Creates a unique id
        add_action(id, state, "netWorth_reducer")                                                                             // Sets item in reducer
        setState({...newInstance})     
    }

console.log(subCategory);

    return (
        <>
        <WhiteBox/>
            <Container subCategory={subCategory} parent={parent}>                                                                       {/* passing in subCategory is used to change the header color */}
                <Left>                                                                                                  {/* Choose one is used to select the account type */}
                    <ChooseOne
                            array={subCategory === "securedDebt" ? propertyNames_selector.concat("None of These") : accountTypeArray }  //if it is secored (a mortgage) it has to be linked to the property its secured against
                            setValue={(value) => setState({...newInstance, registration: value})}
                            value ={"TFSA"}
                            subCategory={subCategory}
                        />
                </Left>
                <Center>
                    <FormInput
                        label="item name"
                        value={state.label}
                        type={"text"}
                        handleChange={(e) => setState({...state, label: e.target.value })}                                   //sets the state in the local state
                    />
                    {subCategory === "securedDebt" ? 
                            <DateInput 
                            label={"Mortgage Start Date"}
                            value={state.startDate.date}
                            handleChange={(event) => setDate(event)}                                                          //sets the state in the local state
                        />
                        : null
                    }
                    {
                        subCategory === "propertyAssets" || subCategory === "securedDebt" || subCategory === "unsecuredDebt" ?     //If its a property or mortgage we want two range bars showing the starting value
                <RangeBar 
                        rangeBarProps={state.bookValue}
                        setValue={setValue}                 
                    /> : null
                    }
                <RangeBar 
                        rangeBarProps={state.value}                                                                      //Every Add item has a range bar to set its value
                        setValue={setValue}                 
                    /> 

                </Center>
                <Right>
                    <MiniRangeBarWrapper>
                        {
                           
                           subCategory === "unsecuredDebt" ?                                                                            //If its a liability we want to know its amortization

                           <MiniRangeBar 
                           rangeBarProps={state.interestRate}
                           setValue={setValue}
                                />
                                :
                            subCategory === "securedDebt" ? 
                            <>
                            <MiniRangeBar 
                            rangeBarProps={state.amortization}
                            setValue={setValue}
                            />   
                            <MiniRangeBar 
                            rangeBarProps={state.interestRate}
                            setValue={setValue}
                                    />
                            </>
                            : null
                            }

               
                    </MiniRangeBarWrapper>
                    <ButtonWrapper>
                            <ButtonLight 
                                text={"Add"}
                                onClick={() => addItem()}
                            />
                    </ButtonWrapper>
                </Right>
            </Container>
        
        </>
       
    )

}

const mapStateToProps = (state) => ({
    propertyNames_selector: propertyNames_selector(state),
    user_reducer: state.user_reducer,
})

export default connect(mapStateToProps, {add_action})(AddForm )


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
const WhiteBox = styled.div`
    position: absolute;
    top: -2rem;
    left: 1rem;
    width: 103rem;
    height: 32rem;
    background: white;
    z-index: 700;
`
const Container = styled.div`
    width: 94rem;
    border-radius: 5px;
    overflow: hidden;
    height: ${props => props.subCategory === "securedDebt" ? "33rem" : "28rem"};                                          
    border: ${props => props.theme.border.primary};
    position: absolute;
    top: ${props => props.parent ? "0rem" : "2rem"};
    left: ${props => props.parent ? "0rem" : "11.8rem"};
    display: flex;
    z-index: 800;
    background: ${props => props.theme.color.ice}
`



