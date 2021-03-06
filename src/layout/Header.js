import React from 'react'
import { NavLink} from "react-router-dom"
import styled from "styled-components"
import logoLight from "assets/svgs/SavvyPlan_logo_final_grey.svg"
import {auth} from "firebase/firebaseUtils"
import LinkButton from "UI/buttons/LinkButton"
import {connect} from "react-redux"
import {signOut_action} from "redux/auth/auth_actions"
import ButtonLight from "UI/buttons/ButtonLight.js"

 function Header({auth, signOut_action}) {

    return (
        <HeaderContainer>
            <Left>
                <Logo>
                    <img src={logoLight} height="100%" width="100%" fontSize="10rem" alt="logo"/>
                </Logo>
                <Header3>
                    Savvy Plan
                </Header3>

            </Left>
            <Right>
          
            <Hr/>
                <PageSelect to="/dashboard">
                        DASHBOARD
                </PageSelect>
            <Hr/>
                    <PageSelect to="/Learn">
                       ACCOUNT
                    </PageSelect>
            <Hr/>
            {
                auth.uid ? 
                <>
                    <LinkButton  to='/landingpage' text={"Sign Out"} onClick={() => signOut_action()}>Sign Out</LinkButton>
                    <Button  onClick={() => window.location.href = 'https://forms.gle/bYaafXK4GKXaJY3eA'}>Feedback</Button>
                </>
                :
                <React.Fragment>
                    {/* <LinkButton  to='/Login' text={"Login"}>Login</LinkButton> */}
                    {/* <LinkButton to='/onboarding' text={"SignUp"}>Sign Up</LinkButton> */}
                    <ButtonLight  text={"Feedback"} onClick={() => window.location.href = 'https://forms.gle/bYaafXK4GKXaJY3eA'}></ButtonLight>
                </React.Fragment>
            }
           
            </Right>
                
        </HeaderContainer>
    )
}


export default connect(null, {signOut_action})(Header)

//--------HEADER GRID LAYOUT---------------------------------------------------------------//

export const HeaderContainer = styled.div`
    width: 100%;
    text-align: center;
    display: flex;
    height: 6rem;
    background: ${props => props.theme.color.slate};  
`
const Logo = styled.div`
        width: 10rem;
        height: 10rem;


`

const Left = styled.div`
        flex: 1;
        display: flex;
        width: 10%;
        align-content: center;
        flex-direction: row;
        align-items: center
        justify-content: left;
`

const Header3 = styled.div`
        font-size: ${props => props.theme.fontSize.medium};
        color: ${props => props.theme.color.ice};
        font-weight: 400;
     
`
const Right = styled.div`
     display: flex;
     jusitfy-content: space-between;
     width: 50%;
     align-items: center;
     font-weight: 300;

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
export const PageSelect = styled(NavLink)`
       padding: 1rem;
       margin: 1rem;
       font-size: ${props => props.theme.fontSize.small};
       ${props => props.theme.flexContent.center};
       height: 100%;
       cursor: pointer;
       position: relative
       border-radius: 1px;
       transition: all .1s ease-in;
       &:hover {
           background: ${props => props.theme.color.ice};
           color:  ${props => props.theme.color.slate};
       }
       text-decoration: none;
       color: white;
    &.active ${PagePointer} {
        background-color: ${props => props.theme.color.slate};
    } 
  } 
`
const Hr = styled.hr`
    width: 1rem;
    color: white;
`


const Button = styled.a`
padding: 1rem 2rem 1rem 2rem;
min-width: 11rem;
width: auto;
height: 5rem;
margin: 1rem;
cursor: pointer;
outline: none;
border-radius: 5rem;
text-transform: uppercase;
position: relative;
font-size: 1.4rem;
  background: ${props => props.theme.color.ice};
  color: ${props => props.theme.color.slate};
  display: flex;
  align-content: center;

`
//
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// Website header rendering the website title, buttons that change the theme, and a login button. 