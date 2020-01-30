import React from 'react'
import styled from "styled-components"


const SelectorButton = ({visible, onClick, text}) => {
    return (
        <SelectorButtonWrapper onClick={onClick}>
            {
               visible ? 
                    <Selector>
                        <SelectorFat/> 
                        <SelectorSkinny/>
                  </Selector> 
                  : 
                    <Selector>
                        <SelectorSkinny/>
                        <SelectorFat/> 
                    </Selector>
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
    background: ${props => props.theme.color.onyx};

`

const Title = styled.div`
    font-size: 3rem;

`
const SelectorSkinny = styled.div`
    width: .1rem;
    height: 4rem;
    border-radius: 5px;
    background: ${props => props.theme.color.onyx};

`

const Selector = styled.div`
    display: flex;
    flex-direction: column;
    width: 3rem;
    height: 10rem;
    align-content: center;
    align-items: center;
    justify-content: space-around;
`