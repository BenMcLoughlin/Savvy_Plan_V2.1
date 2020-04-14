import React from 'react'
import styled from "styled-components"
import logoLight from "assets/svgs/SavvyPlan_logo_final_justlogo.svg"
import LinkButton from "UI/buttons/LinkButton"

export default function LandingPage() {

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
            </Section1>
            <Section2>
            <Intro>See your financial Future</Intro>
            <IntroText>Try Canada’s most intuitive financial planning software  </IntroText>
            <LinkButton color={"blue"} to='/onboarding'>Get Started</LinkButton>
       </Section2>
        </div>
    )
}


//-----------------------------------------------style-----------------------------------------------//

const Section1 = styled.div`
  
    background: ${props => props.theme.color.ice};
    width: 100%;
    height: 40rem;
    clip-path: polygon(0 0, 100% 0, 100% 57%, 0 100%);
    display: flex;
    flex-direction: column;
`

const Header = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   margin-top: 10rem;
   width: 100%
   height: 12rem;
   margin-left: -4rem;
   justify-content: center;
` 
const Logo = styled.div`
   width: 25rem;
   height: 50rem;
`
const Title = styled.div`
   font-size: 9rem;
   font-weight: 300;
   color: ${props => props.theme.color.steelBlue};
   
`
const Section2 = styled.div`
    margin-top: -5rem;
    height: 30rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    jusitfy-content: space-around;
`

const Intro = styled.div`
    padding: 2rem;
    font-size: 4rem;
    text-align: center;
    color: ${props => props.theme.color.blue};
`
const IntroText = styled.div`
    margin-left: 5rem;
    padding: 2rem;
    font-size: 2rem;
    margin-top: 2rem;
    text-align: center;
    width: 100%;
    color: ${props => props.theme.color.slate};
    font-weight: 300;
    line-height: 3rem;
    letter-spacing: .3rem;
`
