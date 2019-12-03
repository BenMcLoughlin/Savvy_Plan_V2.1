import React from 'react'
import styled from "styled-components"


const SelectorButton = ({visible, text}) => {
    return (
        <SelectorButtonWrapper>
            {
               visible ? <SelectorFat/> : <SelectorSkinny/>
            }
            <Title>{text}</Title>
        </SelectorButtonWrapper>
    )

}

export default SelectorButton


const SelectorButtonWrapper = styled.div`
    display: flex;
    width: 10rem;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
`
const SelectorFat = styled.div`
    width: .4rem;
    height: 4rem;
    border-radius: 5px;
    background: grey;

`

const Title = styled.div`
    font-size: 3rem;

`
const SelectorSkinny = styled.div`
    width: .1rem;
    height: 4rem;
    border-radius: 5px;
    background: grey;

`