import React, {useState} from "react"
import styled from "styled-components"
import ControlPanel from "pages/netWorth/components/ControlPanel"
import {connect} from "react-redux"
import ChooseOne from "UI/forms/ChooseOne"
import FormInput  from "UI/forms/Input"
import DateInput from "UI/forms/DateInput"
import RangeBar  from "UI/rangeBar/RangeBar"
import MiniRangeBar  from "UI/miniRangeBar/MiniRangeBar"
import ButtonLight from "UI/buttons/ButtonLight"
import {addItem_action} from "redux/netWorth/netWorth_actions"
import {propertyNames_selector} from "redux/netWorth/netWorth_selectors"

const UnsecuredDebt = ({netWorth_reducer, addItem_action, propertyNames_selector}) => {    

    const initialState = {
        category: "liability", 
        label: null,
        interestRate: {
            rangeBarValue: 0,
            name: "interestRate",
            max: 0.25,
            min: 0,
            step: 0.001,
            label: "Interest Rate",
            numberType: "percentage"
        },
        currentValue: {
            rangeBarValue: 0,
            financialValue: 0,
            name: "currentValue",
            label: "Market Value",
        },
        bookValue: {
            rangeBarValue: 0,
            financialValue: 0,
            name: "bookValue",
            label: "Starting Mortgage Balance",
        },
        amortization: {
            rangeBarValue: 0,
            name: "amortization",
            label: "Amortization",
            max: 40,
            min: 0,
            step: 1,
        },
        startDate: {
            rangeBarValue: 0,
            name: "startDate",
            label: "Start Date",
            date: "",

        },
        payment: {
            rangeBarValue: 0,
            financialValue: 0,
            name: "payment",
            label: "Monthly Payment",
        },
    }
    console.log(netWorth_reducer);
    const [state, setState] = useState({...initialState})

    const setValue = (logValue, rangeBarValue, rangeBarProps) => {
        setState({...state, [rangeBarProps.name]: {
                                ...state[rangeBarProps.name], 
                                        financialValue: logValue,
                                        rangeBarValue: rangeBarValue
    }})
    }
    const setDate = (event) => {
        setState({...state, startDate: {
                                ...state.startDate, 
                                         date: event.target.value
    }})
    }


    const addItem = () => {
        const id = (Math.random() * 1000000).toFixed()
        addItem_action(id, state)
        setState({...initialState})
    }
    return (
        <Wrapper>
            <Header>
                <h2>Secured Debt</h2> 
            </Header>
            <Container> 
                <Left>
                    <ChooseOne
                            array={propertyNames_selector.concat("None of These")}
                            setValue={() => "hi"}
                            value ={1}
                        />
                </Left>
                <Center>
                    <FormInput
                        label="asset name"
                        value={state.label}
                        type={"text"}
                        handleChange={(e) => setState({...state, label: e.target.value })}
                    />

                    <DateInput 
                        label={"Mortgage Start Date"}
                        value={state.startDate.date}
                        handleChange={(event) => setDate(event)}
                    />
                <RangeBar 
                        rangeBarProps={state.bookValue}
                        setValue={setValue}                 
                    />
                </Center>
                <Right>
                    <MiniRangeBarWrapper>
                        <MiniRangeBar 
                            rangeBarProps={state.amortization}
                            setValue={setValue}
                        />
                        <MiniRangeBar 
                            rangeBarProps={state.interestRate}
                            setValue={setValue}
                        />
                    </MiniRangeBarWrapper>
                    <ButtonWrapper>
                            <ButtonLight 
                                text={"Add"}
                                onClick={() => addItem()}
                            />
                    </ButtonWrapper>
                </Right>
            </Container>
        </Wrapper>

       
    )

}
//({text, backward, forward, onClick})
const mapStateToProps = (state) => ({
    netWorth_reducer: state.netWorth_reducer,
    propertyNames_selector: propertyNames_selector(state),
})

export default connect(mapStateToProps, {addItem_action})(UnsecuredDebt )


//-----------------------------------------------STYLES-----------------------------------------------//



const Wrapper = styled.div`
    grid-area: b;
    width: 80%;
    margin-left: 10%;
    border-radius: 5px;
    border: ${props => props.theme.border.primary};
    overflow: hidden;
    height: 35rem;
`
const Header = styled.div`
    width: 100%;
    background: ${props => props.theme.color.darkSalmon};
    height: 4rem;
    color: ${props => props.theme.color.ice}
`
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
const Container = styled.div`
    height: 28rem;
    display: flex;
    position: relative;
`

