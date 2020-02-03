import React, { useState, useEffect} from 'react'
import styled from "styled-components"
import _ from "lodash"
import {Close} from "style/Icons"
import {addItem_action, removeItem_action} from "redux/netWorth/netWorth_actions"
import {connect} from "react-redux"
import RangeBar from "UI/rangeBar/RangeBar"
import ButtonLight from "UI/buttons/ButtonLight"
import Add from "UI/buttons/Add"
import Wizard from "pages/netWorth/components/Wizard"

const Popup = ({category, addItem_action, removeItem_action, subCategory}) => {

    const [count, setCount] = useState(0)
    const [addContainer, toggleAddContainer] = useState(false)

    const emptyState = {
        name: "", 
        financialValue: 0,
        rangeBarValue: 0,
        subCategory: "",
        label: "",
        registration: "none", 
        category: "",
        interestRate: {
            rangeBarValue: 0,
            label: "Interest Rate",
            name: "interestRate",
            max: .1, 
            min: 0,
            step: .01,
            numberType: "percentage"
        },
        remainingYears: {
            rangeBarValue: 0,
            label: "Remaining Years",
            name: "remainingYears",
            max: 40, 
            min: 0,
            step: 1,
        },
        payment: {
            rangeBarValue: 0,
            label: "Payment",
            name: "payment",
            max: 5000, 
            min: 0,
            step: 10
        },
    }

    //balance, interest Rate, amortization, current value, payment, purchase year

    const [state, setState] = useState({...emptyState})

    useEffect(()=> {

        setState({...state, 
                    category: category,
                    subCategory: subCategory,
        
        })

     }, [category])

    const setValue = (logValue, rangeBarValue, rangeBarProps) => {
        setState({...state, financialValue: logValue, rangeBarValue: rangeBarValue})
    }
    const setMiniRangeBarValue = (value, rangeBarValue, rangeBarProps) => {
        setState({...state, [rangeBarProps.name]: {
                            ...state[rangeBarProps.name], rangeBarValue
        }})
    }

    const changeLabel = (e, rangeBarProps) => {
        setState({...state, label: e.target.value})
    }

    const addItem = () => {
        setState({...emptyState})
        setCount(0)
        toggleAddContainer(false)
        const id = (Math.random() * 100000000).toFixed() 
        addItem_action(id, state)
    }

    return (
            <>
            {
                addContainer ? 
                <>
                <Blackout/>
                <Container>
                    <Exit  onClick={() => toggleAddContainer(false)}/>
                    <Title>What kind of {category} are you adding? </Title>
                    <Form>
                        <Wizard 
                            setState={setState}
                            count={count}
                            state={state}
                            removeItem_action={removeItem_action}
                            setValue={setValue}
                            addItem={addItem}
                            subCategory={subCategory}
                            category={category}
                            setMiniRangeBarValue={setMiniRangeBarValue}
                        />
                    </Form>
                     <Buttons>
                                < ButtonLight backward onClick={() => setCount(count > 0 ? count - 1 : 0)}/>
                                < ButtonLight forward onClick={() => setCount(count + 1)}/>
                    </Buttons>
                </Container>
                </>
                : <Add onClick={() => toggleAddContainer(true)}/>
            }
           
        </>
        

    )
}

export default connect(null, {addItem_action, removeItem_action})(Popup)




//-----------------------------------------------style-----------------------------------------------//

const Blackout = styled.div`
    height: 120vh;
    width: 120vw;
    background: black;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
`

const Title = styled.h2`
    padding: 2rem;
    font-weight: 700;
`

const Form = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
`



const Container = styled.div`
    width: 50rem;
    height: 60rem;
    border: 1px solid ${props => props.theme.color.lightGrey};
    border-radius: 3px;
    margin: 1rem;
    padding-top: 1rem;
    background-color: white;
    position: absolute;
    top: 22%;
    left: 30%;
    padding: 2rem;
    z-index: 500;
`

const Exit = styled(Close)`
    position: absolute;
    top: 2rem;
    right: 2rem;;
    cursor: pointer;
    z-index: 300;
    width: 3rem;
    height: 3rem;
`



const Buttons = styled.div`
    position: absolute;
    top: 37rem;
    left: 2rem;
    width: 50%;
    display: flex;
    justify-content: center;
    margin-top: 7rem;
    margin-left: 11rem;
`


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// A container that allows the user to add a new items to state. It collects the data locally as the user inputs it and 
// then on submit sends all the data to the main state reducer to create a new item.  