import React from 'react'
import styled from "styled-components"
import logoLight from "../assets/svgs/SavvyPlan_logo_final_justlogo.svg"
import SavingsStackedChart from "../Dashboard/SavingsPlan/Charts/SavingsStackedChart"
import SavingsAreaChart from "../Dashboard/SavingsPlan/Charts/SavingsAreaChart"
import Button from "../UI/Buttons/ButtonLight"
import RangeBar from "../UI/RangeBar/RangeBar"
import LifetimeIncomeBarChart from "../Dashboard/LifetimeIncome/Charts/LifetimeIncomeBarChart"

export default function LandingPage() {
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
        <div>
            <Section1>
                <Header>
                    <Logo>
                        <img src={logoLight} height="100%" width="100%" fontSize="20rem" alt="logo"/>
                    </Logo>
                    <Title>
                         Savvy Plan  
                    </Title>
                </Header>
                <Charts>
                    <AreaChartPlaceHolder>   
                        <SavingsAreaChart  />
                    </AreaChartPlaceHolder>  
                    <BarChartPlaceHolder>   
                        <SavingsStackedChart/>
                    </BarChartPlaceHolder>   
                </Charts>
                < RangeBarWrapper>
                    <RangeBar rangeBarProps={rangeBarProps}/>   
                    <RangeBar rangeBarProps={rangeBarProps}/>
                </RangeBarWrapper>

            </Section1>
            <Section2>
                <Intro>See your financial Future</Intro>
                <IntroText>Try Canada’s most intuitive financial planning software, <br></br>
                            built for regular people. 
                </IntroText>
                <Buttons>
                    <Button text="TRY FREE"/>
                    <Button text="LOGIN"/>
                </Buttons>
                <Section3Header>We're not an investment platform
                <IntroText>We provided the tools to help you make informed financial decisions.
                </IntroText>
                </Section3Header>

            </Section2>
            <Section3>
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
                <LifetimeIncomeBarChart/>
                </ChartPlaceHolder>    

            </Section3>
        </div>
    )
}


//-----------------------------------------------STYLES-----------------------------------------------//
 const Section1 = styled.div`
 background: ${props => props.theme.color.ice};
 width: 100%;
 height: 70rem;
 clip-path: polygon(0 0, 100% 0, 100% 57%, 0 100%);
 display: flex;
 flex-direction: column;
 `
 const Section3 = styled.div`
    background: ${props => props.theme.color.ice};
    width: 100%;
    height: 120rem;
    clip-path: polygon(0 25%, 100% 0, 100% 73%, 0 100%);
    display: flex;
    flex-direction: column;
    margin-top: -22rem;
 `

const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 50%;
    height: 20%;
    justify-content: space-around;
` 
const RangeBarWrapper = styled.div`
    width: 70%;
    margin-left: 5%;
    display: flex;
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
const Charts = styled.div`
    height: 30rem;
    width: 100%;
    margin-top: -3rem;
`

const AreaChartPlaceHolder = styled.div`
    width: 90%;
    margin-left: 5%;
    height: 60%;
    position: relative;
`
const BarChartPlaceHolder = styled.div`
    width: 90%;
    margin-left: 5%;
    height: 40%;
    position: relative;

`
const Section2 = styled.div`
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

 //${props => props.theme.color.ice}