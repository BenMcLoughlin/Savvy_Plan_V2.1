import React, {useState} from 'react'
import styled from "styled-components"
import IncomeInput from "./Components/IncomeInput"
import PensionIncomeStartAges from "./Components/PensionIncomeStartAges"
import DesiredRetirementIncome from "./Components/DesiredRetirementIncome"


export default function ControlPanel(props) {
        return (

                    <ControlPanelWrapper>
                    <Section>
                    <h2>Estimate Lifetime Earnings</h2>
                    <IncomeInput
                           {...props}                                                                                          //  All props are passed through to the child component
                        />
                    </Section>
                    <Section>

                     <h2>Desired Retirement Income</h2>
                        <DesiredRetirementIncome
                         {...props}
                        />
                    </Section>
                    <Section>
                    <h2>Select Retirement Age</h2>
                         <PensionIncomeStartAges
                         {...props}
                         />
                    </Section>
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
    position: relative;
`

const Section = styled.div`
    flex: 1;
`
