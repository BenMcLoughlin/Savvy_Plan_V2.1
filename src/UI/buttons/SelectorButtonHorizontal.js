import React from 'react'
import styled from "styled-components"


const SelectorButtonHorizontal = ({visible, onClick, text}) => {
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

export default SelectorButtonHorizontal


const SelectorButtonWrapper = styled.div`
    display: flex;
    width: 20rem;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
`
const SelectorFat = styled.div`
    width: 8rem;
    height: .8rem;
    border-radius: 5px;
    background: ${props => props.theme.color.onyx};

`

const Title = styled.div`
    font-size: 3rem;

`
const SelectorSkinny = styled.div`
    width: 8rem;
    height: .1rem;
    border-radius: 5px;
    background: ${props => props.theme.color.onyx};

`

const Selector = styled.div`
    display: flex;
    flex-direction: row;
    width: 20rem;
    height: 2rem;
    align-content: center;
    align-items: center;
    justify-content: space-around;
`