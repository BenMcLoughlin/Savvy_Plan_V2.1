import React, {Component} from 'react'
import styled from "styled-components"
import Withdrawals from "./Components/Withdrawals"
import Contributions from"./Components/Contributions"
import InvestmentFactors from "./Components/InvestmentFactors"
import SelectorButton from "../../../UI/Buttons/SelectorButton"


const ControlPanel =(props) => {

        return (
            <ControlPanelWrapper>
                <Left>
                <h2>Savings Contributions </h2>
                     <Contributions
                               {...props}
                     />

                </Left>
                <Center>
                <h2>Future Withdrawals </h2>
                     <Withdrawals
                               {...props}
                     />
                </Center>
                <Right>
                     <Title>Investment Returns</Title>
                     <InvestmentFactors
                               {...props}
                     />
                </Right>
            </ControlPanelWrapper>
        )

    }

    export default ControlPanel
//-----------------------------------------------STYLES-----------------------------------------------//

const ControlPanelWrapper = styled.div`
    grid-area: d;
    display: flex;
    color: ${props => props.theme.color.slate};
    border-top: ${props => props.theme.border.primary};
    padding-top: 2rem;
`

const Left = styled.div`
    flex: 1;
`
const Center = styled.div`
    flex: 1;
`
const Right = styled.div`
    flex: 1;
`
const Title = styled.div `
    font-size: ${props => props.theme.fontSize.medium};
    text-align: center;
    font-weight: 300;
   
` 

