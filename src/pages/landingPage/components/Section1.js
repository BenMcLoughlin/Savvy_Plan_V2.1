import React from 'react'
import styled from "styled-components"
import logoLight from "assets/svgs/SavvyPlan_logo_final_justlogo.svg"


export default function Section1() {

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



