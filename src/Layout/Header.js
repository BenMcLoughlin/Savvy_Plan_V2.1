import React from 'react'
import FontAwesome from "react-fontawesome"
import { NavLink} from "react-router-dom"
import styled from "styled-components"
//import GoogleAuth from "../services/GoogleAuth"
import logoLight from "../assets/svgs/logoLight.svg"

export default function Header(props) {
    return (
        <HeaderContainer>
                <JumboTron>
                <Logo>
                    <img src={logoLight} height="100%" width="100%" fontSize="10rem" alt="logo"/>
                </Logo>
                    <HeaderTextWrapper>
                        <HeaderText>
                            Savvy  <span>Plan</span> 
                        </HeaderText>
                        <Hr/>
                    </HeaderTextWrapper>
                    <AngleDiv/>
                </JumboTron>
                <NavBar>
                    <NavPanelLeft>
                    <StyledNavLink to="/Home" activeClassName="active">
                        <PageSelect>
                            <FontAwesome style={{fontSize:"1.3rem", marginRight: "0.5rem", textDecoration: 'none'}}name="fas fa-home"/>
                            Home
                         <PagePointer/>
                        </PageSelect>
                    </StyledNavLink>
                    <StyledNavLink to="/Dashboard" activeClassName="active">
                    <PageSelect>
                      <FontAwesome style={{fontSize:"1.3rem", marginRight: "0.5rem"}}name="fas fa-chalkboard"/>
                      Dashboard
                      <PagePointer/>
                    </PageSelect>
                </StyledNavLink>
                    <StyledNavLink to="/Learn" activeClassName="active">
                        <PageSelect>
                            <FontAwesome style={{fontSize:"1.3rem", marginRight: "0.5rem", textDecoration: 'none'}}name="fas fa-chalkboard-teacher"/>
                            Learn
                         <PagePointer/>
                        </PageSelect>
                    </StyledNavLink>
                    </NavPanelLeft>
                    <NavPanelRight>
                        <ThemeButton color="black" onClick={props.setDarkTheme}>Dark Theme</ThemeButton>
                        <ThemeButton color="white" onClick={props.setLightTheme}>Light Theme</ThemeButton>
                        
                        <Button>Sign Up</Button>
                        <FontAwesome style={{fontSize:"1.3rem", marginRight: "0.5rem"}}name="fas fa-cog"/>
                    </NavPanelRight>
                </NavBar>
                <Runner>
                   
                </Runner>
        </HeaderContainer>
    )
}




//--------HEADER GRID LAYOUT---------------------------------------------------------------//

export const HeaderContainer = styled.div`
    width: 100%;
    text-align: center;
    position: relative;
    display: grid;
    grid-template-rows: 12rem 4rem .5rem;
    grid-template-areas: 
    "j "
    "n "
    "r "
`

//--------JUMBOTRON & CONTENTS---------------------------------------------------------------//

export const Logo = styled.div`
        width: 7rem;
        height: 7rem;
        position: absolute;
        left: 2rem;
        border-radius: 50%;
        border: .5px solid ${props => props.theme.color.dullSteelBlue};
        ${props => props.theme.flexContent.center};
`

export const JumboTron = styled.div`
        grid-area: j;
        background-color: ${props => props.theme.color.background1};
        position: relative;
        ${props => props.theme.flexContent.center};
`
export const AngleDiv = styled.div`
        width: 100%;
        height: 100%;
        position: absolute;
        clip-path: polygon(78% 0,100% 0,100% 100%,65% 100%);
        background-color: ${props => props.theme.color.dullSteelBlue};
`

export const HeaderTextWrapper = styled.div`
       ${props => props.theme.flexContent.center};
       flex-direction: column; 
`
export const HeaderText = styled.div`

       font-size: ${props => props.theme.fontSize.largest};
       font-weight: 200;
       color: ${props => props.theme.color.contrastText1};
       z-index: 1;

       &:span {
           color: black
       }
`
export const Hr = styled.hr`
        border: .5px solid white;
        width: 45rem;
`
export const SubText = styled.div`
       margin-top: -1rem;
       font-size: 1.6rem;
       font-weight: 300;
       color: #efeae1;
       letter-spacing: .5rem;
       z-index: 1;
`
//--------Nav Bar---------------------------------------------------------------//

export const NavBar = styled.div`
        grid-area: n;
        background-color: ${props => props.theme.color.background3};
        display: flex;
        justify-content: space-between;
`

export const NavPanelLeft = styled.div`
       width: 30rem;
       display: flex;
       margin-left: 12rem;
       align-items: center;
       height: 100%;
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

export const NavPanelRight = styled.div`
       width: 60rem;
       display: flex;
       margin-left: 12rem;
       align-items: center;
       height: 100%;
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

export const StyledNavLink = styled(NavLink)`
       text-decoration: none;
       color: white;
    &.active ${PagePointer} {
        background-color: ${props => props.theme.color.dullSteelblue};
    } 
  } 
  `


export const HeaderAvatar = styled.div`
        height: 3rem;
        width: 3rem;
        background-color: blue;
        border-radius: 50%;
        margin: 1rem;
`

export const Button = styled.div`
        width: 12rem;
        height: 3rem;
        font-size: ${props => props.theme.fontSize.small};
        border: 1px solid ${props => props.theme.color.dullSteelBlue};
        background-color: ${props => props.theme.color.primaryDaBackgroundrk1};
        border-radius: 3px;
        margin: 1rem;
        ${props => props.theme.flexContent.center};
        cursor: pointer;
`
export const ThemeButton = styled(Button)`
        background-color: ${props => props.color};
        color: ${props => props.color === "black" ? "white" : "black"}
`
export const LeftNavDiv = styled.div`
        ${props => props.theme.flexContent.center};
`
//--------BOTTOM RUNNER---------------------------------------------------------------//

export const Runner = styled.div`
        grid-area: r;
        background-color: ${props => props.theme.color.dullSteelBlue};
`


//
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// Website header rendering the website title, buttons that change the theme, and a login button. 