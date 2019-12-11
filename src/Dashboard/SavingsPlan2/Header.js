import React, { Component } from 'react'
import styled from "styled-components"
//import calculateMarginalTaxRate from "../../services/taxCalculationServices/taxCalculator"
import Tooltip from "../../UI/Tooltip/Tooltip"
export default class HeaderValues extends Component {

render () {
return (
            <HeaderValuesWrapper>
                            Header
            </HeaderValuesWrapper>
        )
    }
}

//-----------------------------------------------STYLES-----------------------------------------------//


const HeaderValuesWrapper = styled.div`
    grid-area: a;                                                                                             {/*Grid-area set in LifeTimeIncomeApp, "a" positions it at the top */}
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
    justify-content: center;
    text-align: center;
    display: inline-block;
    padding: 1rem;
    margin-top: 1rem;
    cursor: pointer;
    font-size: ${props => props.theme.fontSize.medium};

  
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
const TaxSummary = styled(Summary)`
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


const PensionIncomeWrapper = styled.div`
    display: flex;
    width: 60%;
    border-bottom: ${props => props.theme.border.primary};
`




