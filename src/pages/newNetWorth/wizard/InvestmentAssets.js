import React, {useState} from "react"
import styled from "styled-components"
import ControlPanel from "pages/netWorth/components/ControlPanel"
import Header from "pages/netWorth/components/Header"
import {connect} from "react-redux"
import ChooseOne from "UI/forms/ChooseOne"
import FormInput  from "UI/forms/Input"
import RangeBar  from "UI/rangeBar/RangeBar"
import MiniRangeBar  from "UI/miniRangeBar/MiniRangeBar"
import ButtonLight from "UI/buttons/ButtonLight"
import {addItem_action} from "redux/netWorth/netWorth_actions"

const InvestmentAssets = ({netWorth_reducer, addItem_action}) => {    

    const initialState = {
        category: "asset", 
        label: "",
        interestRate: {
            rangeBarValue: 0,
            name: "interestRate",
            max: 0.1,
            min: 0,
            step: 0.001,
            label: "Rate of Return",
            numberType: "percentage"
        },
        currentValue: {
            rangeBarValue: 0,
            financialValue: 0,
            name: "currentValue",
            label: "Cash Value",
        },
        bookValue: {
            rangeBarValue: 0,
            financialValue: 0,
            name: "bookValue",
            label: "Book Value / Purchase Price",
        }
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
    const addItem = () => {
        const id = (Math.random() * 1000000).toFixed()
        addItem_action(id, state)
        setState({...initialState})
    }
    return (
        <Container> 
            <Left>
                <ChooseOne
                        array={["TFSA", "RRSP", "RESP","Non-Registered Savings", "LIRA" ]}
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

                <RangeBar 
                    rangeBarProps={state.bookValue}
                    setValue={setValue}                 
                />
               <RangeBar 
                    rangeBarProps={state.currentValue}
                    setValue={setValue}                 
                />
            </Center>
            <Right>
                <MiniRangeBarWrapper>
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
       
    )

}
//({text, backward, forward, onClick})
const mapStateToProps = (state) => ({
    netWorth_reducer: state.netWorth_reducer
})

export default connect(mapStateToProps, {addItem_action})(InvestmentAssets )


//-----------------------------------------------STYLES-----------------------------------------------//



const Left = styled.div`
    width: 30rem;
    padding: 2rem;
`
const ButtonWrapper = styled.div`
    position: absolute;
    bottom: 2rem;
    right: 2rem;
`
const MiniRangeBarWrapper = styled.div`
    position: absolute;
    right: 3rem;
    top: 11rem;
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
    grid-area: b;
    width: 80%;
    margin-left: 10%;
    height: 35rem;
    border-radius: 5px;
    border: ${props => props.theme.border.primary};
    display: flex;
    position: relative;
`

