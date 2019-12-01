import React from 'react'
import styled from "styled-components"
import TodaysValues from "./Components/TodaysValues"
import Contributions from"./Components/Contributions"
import InvestmentFactors from "./Components/InvestmentFactors"


export default function ControlPanel(props) {

        return (
            <ControlPanelWrapper>
                <Left>
                <Title>Todays Value</Title>
                    <TodaysValues
                       {...props}                                                                                          //  All props are passed through to the child component
                    />
                </Left>
                <Center>
                     <Title>Estimate Future Contributions </Title>
                     <Contributions
                     {...props}
                     />
                </Center>
                <Right>
                     <Title>Select Retirement Age</Title>
                     <InvestmentFactors
                     {...props}
                     />
                </Right>
            </ControlPanelWrapper>
        )
    }


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