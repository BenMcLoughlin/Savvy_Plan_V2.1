import React from 'react'
import styled from "styled-components"
import logoLight from "../../assets/svgs/SavvyPlan_logo_final_justlogo.svg"
import SavingsStackedChart from "../../Dashboard/SavingsPlan/Charts/SavingsStackedChart"
import SavingsAreaChart from "../../Dashboard/SavingsPlan/Charts/SavingsAreaChart"
import Button from "../../UI/Buttons/ButtonLight"
import RangeBar from "../../UI/RangeBar/RangeBar"
import {connect} from "react-redux"
import SavingsPlanApp from "../../Dashboard/SavingsPlan/SavingsPlanApp"

export default function Section1() {
    const rangeBarProps = {
        age: 20, 
        contribute: 0,
        financialValue: 0,
        label: "Contributions",
        maxContribution: 0,
        name: "nonRegistered",
        optimizedContribution: 0, 
        optimizedWithdrawal: 0, 
        rangeBarValue: 0, 
        totalContributions: 0, 
        totalInterest: 0, 
        totalValue: 0, 
        withdraw: 0,
    }

    return (

            <Wrapper>
                <Header>
                    <Logo>
                        <img src={logoLight} height="100%" width="100%" fontSize="20rem" alt="logo"/>
                    </Logo>
                    <Title>
                         Savvy Plan
                    </Title>
                </Header>
                <SavingsPlanApp landingPage style={{marginTop: "-55rem"}}/>

            </Wrapper>

    )
}

const Wrapper = styled.div`
  
    background: ${props => props.theme.color.ice};
    width: 100%;
    height: 90rem;
    clip-path: polygon(0 0, 100% 0, 100% 57%, 0 100%);
    display: flex;
    flex-direction: column;
`

const Header = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   width: 50%;
   height: 20%;
   justify-content: space-around;
` 
const Logo = styled.div`
   width: 50%;
   height: 100%;
`
const Title = styled.div`
   font-size: 7rem;
   font-weight: 300;
   color: ${props => props.theme.color.slate};
   margin-left: -20%;
`




///section 2

import React from 'react'
import styled from "styled-components"
import { NavLink} from "react-router-dom"
import LinkButton from "../../UI/Buttons/LinkButton"

export default function Section2() {

    return (

        <Wrapper>
            <Intro>See your financial Future</Intro>
            <IntroText>Try Canada’s most intuitive financial planning software, <br></br>
                        built for regular people. 
            </IntroText>
            <LinkButton to='/SignUp'>Sign Up</LinkButton>
            {/* <Buttons>
                <Button text="TRY FREE"/>
                <Button text="LOGIN"/>
            </Buttons> */}
            <Section3Header>We're not an investment platform
            <IntroText>We provided the tools to help you make informed financial decisions.
            </IntroText>
            </Section3Header>

       </Wrapper>

    )
}

const Button = styled(NavLink)`
    padding: 1rem;
    width: 10rem;
    height: 4rem;
    margin: 1rem;
    background: ${props => props.theme.color.ice};
    color: ${props => props.theme.color.slate};
    cursor: pointer;
    outline: none;
    border-radius: 5rem;
    text-transform: uppercase;
    position: relative
`


const Wrapper = styled.div`
    margin-top: -4rem;
    height: 60rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Intro = styled.div`

    font-size: 4rem;
    text-align: center;
    color: ${props => props.theme.color.blue};
`
const IntroText = styled.div`
    margin-left: 40%;
    font-size: 2rem;
    margin-top: 2rem;
    text-align: left;
    width: 60%;
    color: ${props => props.theme.color.slate};
    font-weight: 300;
    line-height: 3rem;
    letter-spacing: .3rem;
`
const Buttons = styled.div`
    height: 20rem;
    width: 100%;
    margin-top: 2rem;
    text-align: center;
`
const Section3Header = styled.div`
    font-size: 4rem;
    margin-top: 15rem;
    z-index: 10;
    color: ${props => props.theme.color.slate};
`



//section 3

import React from 'react'
import styled from "styled-components"
import LifetimeIncomeBarChart from "../../Dashboard/LifetimeIncome/Charts/LifetimeIncomeBarChart"
import RangeBar from "../../UI/RangeBar/RangeBar"
import DualRangeBar from "../../UI/DualRangeBar"

export default function Section2() {

    const rangeBarProps = {
        age: 20, 
        contribute: 0,
        financialValue: 0,
        label: "Employment Income",
        maxContribution: 0,
        name: "nonRegistered",
        optimizedContribution: 0, 
        optimizedWithdrawal: 0, 
        rangeBarValue: 0, 
        totalContributions: 0, 
        totalInterest: 0, 
        totalValue: 0, 
        withdraw: 0,
    }


    return (

        <Wrapper>
            <PensionIncomeWrapper >
                    <Summary>
                    {`${(13000)/1000}k`}  
                        <h4>Canada Pension Plan</h4>
                        <Circle color={"#F29278"}/>
                    </Summary>
                    <Vr />
                    <Summary >
                    {`${(7000)/1000}k`}
                        <h4 >Old Age Security</h4>
                        <Circle color={"#7DA8B8"}/>
                    </Summary>
            </PensionIncomeWrapper>
               <ChartPlaceHolder>
                   Lifetime Income Chart
                <LifetimeIncomeBarChart/>
                </ChartPlaceHolder>    

                <YearsSelectorWrapper>
                    <SelectorTitleWrapper>
                            <div>From Age</div>    
                            <div>To Age</div>    
                        </SelectorTitleWrapper>
                    <DualRangeBar
                                       fromAge={18}                                                                                       //fromAge sets the from Age, eg. age 18 in 18-45
                                       toAge={45}                                                                                           //toAge sets the to Age, eg. age 45 in 18-45
                                       setKeyVariables={"banana"}     
                    />
                 <RangeBar rangeBarProps={rangeBarProps}/>   
                </YearsSelectorWrapper>

       </Wrapper>

    )
}

const Wrapper = styled.div`
    background: ${props => props.theme.color.ice};
    width: 100%;
    height: 120rem;
    clip-path: polygon(0 25%, 100% 0, 100% 73%, 0 100%);
    display: flex;
    flex-direction: column;
    margin-top: -22rem;
`


const ChartPlaceHolder = styled.div`
    width: 90%;
    margin-left: 5%;
    height: 20rem;

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
const Vr = styled.div`
    height: 60%;
    width: 1%;
    margin-top: 2rem;
    flex-basis: 0.1;
    flex: 1 0.1 1;
    border-left: ${props => props.theme.border.primary};
`

const PensionIncomeWrapper = styled.div`
    margin-top: 25%;
    margin-left: 60%;
    color: ${props => props.theme.color.slate};
    display: flex;
    width: 25%;
    border-bottom: ${props => props.theme.border.primary};
`

const YearsSelectorWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 30%;
    margin-left: 10%;
`
const SelectorTitleWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: .5rem;
    font-size: ${props =>props.theme.fontSize.small};
    color: ${props => props.theme.color.slate};
`

 //${props => props.theme.color.ice}