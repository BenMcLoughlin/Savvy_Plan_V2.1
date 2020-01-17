import React from 'react'
import styled from "styled-components"
import { NavLink} from "react-router-dom"
import logoLight from "assets/svgs/SavvyPlan_logo_final_white_justlogo.svg"

export default function Header() {
    return (
        <FooterContainer>
        <Top>
            <StyledNavLink to="/Home" activeClassName="active">
                <PageSelect>
                    Home
                </PageSelect>
            </StyledNavLink>
            <StyledNavLink to="/Dashboard" activeClassName="active">
                <PageSelect>
                Dashboard
                </PageSelect>
            </StyledNavLink>
            <StyledNavLink to="/Learn" activeClassName="active">
                <PageSelect>
                    Learn
                </PageSelect>
        </StyledNavLink>
        </Top>
            <Hr/>
        <Logo>
            <img src={logoLight} height="100%" width="100%" fontSize="10rem" alt="logo"/>
        </Logo>
        </FooterContainer>
    )
}

//-----------------------------------------------style-----------------------------------------------//

export const FooterContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 20rem;
    background: #536D7A;
    align-items: center;
    position: absolute;

`
const Hr = styled.hr`
    border-top: ${props => props.theme.border.primary};
    width: 80%;
    margin: 0 auto;
    fill: red;
`
const Logo = styled.div`
        width: 10rem;
        height: 10rem;
        padding: 0;
        text-align: center;
`
const Top = styled.div`
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 70%;
        padding: 3rem;

`
export const PagePointer = styled.div`
        height: 5rem;
        width: 5rem;
        background: transparent;
        clip-path: polygon(25% 73%, 0% 100%, 100% 100%);
        position: absolute;
        top: -2rem;
        z-index: 3;
`
export const PageSelect = styled.div`
       width: 10rem;
       padding: 0rem 1rem 0rem 1rem;
       font-size: ${props => props.theme.fontSize.small};
       ${props => props.theme.flexContent.center};
       font-weight: 700;
       height: 100%;
       cursor: pointer;
       position: relative
`

export const StyledNavLink = styled(NavLink)`
       text-decoration: none;
       color: white;
    &.active ${PagePointer} {
        background-color: ${props => props.theme.color.slate};
    } 
  } 
  `
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
//blank slate