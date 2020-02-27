import React, { Component } from 'react'
import styled from "styled-components"


const  Header = () => {



return (
            <Wrapper >
                < Left>
                      <h1> Lifetime Income Chart</h1> 
                </Left>
                
            </Wrapper>
        )
    }

export default Header
//-----------------------------------------------style-----------------------------------------------//


const Wrapper = styled.div`
    grid-area: a;                                                                                             {/*Grid-area set in Income, "a" positions it at the top */}
    height: 100%;
    width: 100%;
    display: flex;
    margin-top: 4rem;
    position: relative;
    color: ${props => props.theme.color.slate};
`

const Left = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

const Summary = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin-top: 1rem;
    cursor: pointer;
    font-size: ${props => props.theme.fontSize.medium};
    align-items: center;
    justify-content: center;

  
`
const CPPSummary = styled(Summary)`
    &:hover .cppTooltip {
        opacity: 1;
        visibility: visible;
    }
`
const OASSummary = styled(Summary)`
    &:hover .oasTooltip {
        opacity: 1;
        visibility: visible;
    }
`
const RRIFSummary = styled(Summary)`
    &:hover .rrifTooltip {
        opacity: 1;
        visibility: visible;
    }
`
const NRegSummary = styled(Summary)`
    &:hover .taxTooltip {
        opacity: 1;
        visibility: visible;
    }
`

const Vr = styled.div`
    height: 60%;
    width: 1%;
    margin-top: 2rem;
    flex-basis: 0.1;
    flex: 1 0.1 1;
    border-left: ${props => props.theme.border.primary};
`

const Right = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
`
const Circle = styled.div`
   border-radius: 50%;
   height: 1rem;
   width: 1rem;
   margin-top: .5rem;
   background: ${props => props.color}
   display: flex;
   align-items: center;
`


const PensionIncomeWrapper = styled.div`
    display: flex;
    width: 60%;
    border-bottom: ${props => props.theme.border.primary};
`




