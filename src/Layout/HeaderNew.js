import React from 'react'
import FontAwesome from "react-fontawesome"
import { NavLink} from "react-router-dom"
import styled from "styled-components"
import logoLight from "../assets/images/SavvyPlan_logo_final_greyscale.png"

export default function Header(props) {
    return (
        <HeaderContainer>
            <Left>
                <Logo>
                    <img src={logoLight} height="100%" width="100%" fontSize="10rem" alt="logo"/>
                </Logo>
                <StyledNavLink to="/Home" activeClassName="active">
                <PageSelect>
                    <FontAwesome style={{fontSize:"1.3rem", marginRight: "0.5rem", textDecoration: 'none'}}name="fas fa-home"/>
                    Home

                </PageSelect>
            </StyledNavLink>
            <StyledNavLink to="/Dashboard" activeClassName="active">
            <PageSelect>
              <FontAwesome style={{fontSize:"1.3rem", marginRight: "0.5rem"}}name="fas fa-chalkboard"/>
              Dashboard
   
            </PageSelect>
        </StyledNavLink>
            <StyledNavLink to="/Learn" activeClassName="active">
                <PageSelect>
                    <FontAwesome style={{fontSize:"1.3rem", marginRight: "0.5rem", textDecoration: 'none'}}name="fas fa-chalkboard-teacher"/>
                    Learn
                </PageSelect>
            </StyledNavLink>
                
            </Left>
            <Right>
            </Right>
                
        </HeaderContainer>
    )
}




//--------HEADER GRID LAYOUT---------------------------------------------------------------//

export const HeaderContainer = styled.div`
    width: 100%;
    text-align: center;
    display: flex;
    height: 8rem;
    background: ${props => props.theme.color.background3};
    font-weight: 200;
    
`
const Logo = styled.div`
        width: 10rem;
        height: 10rem;


`
const Left = styled.div`
        flex: 1;
        display: flex;

`
const Right = styled.div`
     flex: 1;

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
        background-color: ${props => props.theme.color.dullSteelblue};
    } 
  } 
  `

//
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// Website header rendering the website title, buttons that change the theme, and a login button. 