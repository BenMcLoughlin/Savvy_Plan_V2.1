import React, { useState} from 'react'
import styled from "styled-components"
import _ from "lodash"
import {Close} from "style/Icons"
import {addItem_action, removeItem_action} from "redux/netWorth/netWorth_actions"
import {connect} from "react-redux"
import RangeBar from "UI/rangeBar/RangeBar"
import ButtonLight from "UI/buttons/ButtonLight"
import LiabilityWizard from "pages/newNetWorth/components/AddItems/LiabilityWizard"

const AddCash = ({addItem_action, removeItem_action}) => {

    const [count, setCount] = useState(0)
    const [addContainer, toggleAddContainer] = useState(false)

    const emptyState = {
        name: "", 
        financialValue: 0,
        rangeBarValue: 0,
        catagory: "",
        type: "",
        label: "",
        category: "liabilities",
    }
    const [state, setState] = useState({...emptyState})

    const setValue = (logValue, rangeBarValue, rangeBarProps) => {
        setState({...state, financialValue: logValue, rangeBarValue: rangeBarValue})
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
                    <Exit  onClick={() => setState({...state, addContainerOpen: false})}/>
                    <Form>
                        <LiabilityWizard 
                        setState={setState}
                        count={count}
                        state={state}
                        removeItem_action={removeItem_action}
                        setValue={setValue}
                        addItem={addItem}
                        />
                    </Form>
                     <Buttons>
                                < ButtonLight backward onClick={() => setCount(count > 0 ? count - 1 : 0)}/>
                                < ButtonLight forward onClick={() => setCount(count + 1)}/>
                    </Buttons>
                </Container>
                </>
                : <Button onClick={() => toggleAddContainer(true)} text={"Add Liability"}></Button>
            }
           
        </>
        

    )
}

export default connect(null, {addItem_action, removeItem_action})(AddCash)




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

const TextInput = styled.input`
        font-size: ${props =>props.theme.fontSize.small};
        color: ${props => props.theme.color.slate};
        position: absolute;
        width: 85%;
        top: -1.5rem;
        left: 1rem;
        border-radius: 3px;
        padding: 0.3rem;
        text-transform: capitalize;
        background: white;
        border: 1px solid ${props => props.theme.color.lightGrey};
        cursor: pointer;
        &:focus,
        &:active {
            outline: 0  !important;
            border: 1px solid ${props => props.theme.color.drab};
        }
`


const Container = styled.div`
    width: 50rem;
    height: 45rem;
    border: 1px solid ${props => props.theme.color.lightGrey};
    border-radius: 3px;
    margin: 1rem;
    padding-top: 1rem;
    background-color: white;
    position: absolute;
    top: 25%;
    left: 30%;
    padding: 2rem;
    z-index: 500;
`
const RangeBarWrapper = styled.div`
    margin-top: 2rem;
    position: relative;
    padding-left: 1rem;
    width: 25rem;
`



const ButtonWrapper = styled.div`
    width: 18rem;
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

const CheckboxWrapper = styled.div`


`

const Button = styled(ButtonLight)`
    bottom: 3rem;
    left: 1rem;
    background: red;

`

const Buttons = styled.div`
    position: absolute;
    top: 33rem;
    left: 2rem;
    width: 50%;
    display: flex;
    justify-content: center;
    margin-top: 3rem;
    margin-left: 11rem;
`


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// A container that allows the user to add a new items to state. It collects the data locally as the user inputs it and 
// then on submit sends all the data to the main state reducer to create a new item.  