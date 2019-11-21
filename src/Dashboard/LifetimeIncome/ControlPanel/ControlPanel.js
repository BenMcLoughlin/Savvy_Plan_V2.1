import React from 'react'
import styled from "styled-components"
import IncomeInput from "./Components/IncomeInput"
import RRSPDetails from "./Components/RRSPDetails"
import PensionIncomeStartAges from "./Components/PensionIncomeStartAges"


export default function ControlPanel(props) {

        return (
            <ControlPanelWrapper>
                <Left>
                    <IncomeInput
                       {...props}                                                                                          //  All props are passed through to the child component
                    />
                </Left>
                <Center>
                     <Title>Estimate Future RRSP Value</Title>
                     <RRSPDetails
                     {...props}
                     />
                </Center>
                <Right>
                     <Title>Select Retirement Age</Title>
                     <PensionIncomeStartAges
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
    color: ${props => props.theme.color.contrastText1};
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