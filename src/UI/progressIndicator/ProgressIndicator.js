import React from 'react'
import styled from "styled-components"


const ProgressIndicator = ({complete, totalSteps}) => {
    const incompleteArray = complete < totalSteps ? [...Array(totalSteps - complete).keys()] : []
    const completeArray = [...Array(complete).keys()] || []

    return (
        < Wrapper>
                {
                    completeArray.length > 0 ?
                    completeArray.map(d => <StepComplete/>)
                    : null
                }
                {
                    incompleteArray.length > 0 ?
                    incompleteArray.map(d => <StepIncomplete/>)
                    : null
                }
        </Wrapper>
    )

}

export default ProgressIndicator


const Wrapper = styled.div`
    height: 1rem;
    width: 20rem;
    display: flex;
    justify-content: center;    
`
const StepComplete = styled.div`
    height: .5rem;
    width: 3rem;
    margin: .2rem;
    border-radius: 3px;
    background: white
`
const StepIncomplete = styled(StepComplete)`
    background: none;
    border: 1px solid white;
`