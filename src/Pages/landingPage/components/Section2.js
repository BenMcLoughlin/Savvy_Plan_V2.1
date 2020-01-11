
import React from 'react'
import styled from "styled-components"
import LinkButton from "UI/Buttons/LinkButton"

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
const Section3Header = styled.div`
    font-size: 4rem;
    margin-top: 15rem;
    z-index: 10;
    color: ${props => props.theme.color.slate};
`



