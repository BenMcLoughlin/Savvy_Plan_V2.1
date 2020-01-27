import React, { useState } from 'react'
import Input from "UI/forms/Input"
import styled from "styled-components"
import ButtonLight from "UI/buttons/ButtonLight"
import { NavLink, Redirect} from "react-router-dom"
import {auth} from "firebase/firebaseUtils"
import {signInWithGoogle} from "firebase/firebaseFunctions"
import LinkButton from "UI/buttons/LinkButton"
import {connect} from "react-redux"
import {signUp_action} from "redux/auth/auth_actions"
import logoLight from "assets/svgs/SavvyPlan_logo_final_justlogo.svg"


const Login = ({auth, authError,  signUp_action}) => {

    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
  });
console.log(auth);
  
  const { firstName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = (e) => {
        e.preventDefault()
        signUp_action(userCredentials)
    }

  const handleChange = event => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };
  
  if (auth.uid) return <Redirect to="/onboarding"/>

    return (
    <Wrapper>
        <Section>
             <Logo>
                    <img src={logoLight} height="100%" width="100%" fontSize="10rem" alt="logo"/>
            </Logo>
             <Title>
                  Sign Up for Savvy Plan
            </Title>

            <Form onSubmit={handleSubmit}>
                <Input label="Email" handleChange={handleChange} type="email" value={email} name="email" required/>
                <Input label="Password" handleChange={handleChange} type="password" value={password} name="password" required/>
                <Input label="Confirm Password" handleChange={handleChange} type="password" value={confirmPassword} name="confirmPassword" required/>
                < Buttons>
                    <ButtonLight text={"SIGN UP"} type="submit" onClick={handleSubmit} />
                    <ButtonLight text={"USE GOOGLE"} onClick={signInWithGoogle}/>
                </Buttons>
                <RedText>
                    {authError ? <p>{authError}</p> : null}
                </RedText>
            </Form>
            <ClickableText>
            By Clicking Sign Up you are accepting our 
                <LinkWrapper to='/Onboarding'> Terms of Use</LinkWrapper>
            </ClickableText>
        </Section>

            <Title>
              <LinkButton to="/login">
              Login
            </LinkButton>
            </Title>
           
    </Wrapper>

    )
}

const mapStateToProps = (state) => ({
        auth: state.firebase.auth,
        authError: state.auth.authError,
})

export default connect(mapStateToProps, {signUp_action})(Login)


//-----------------------------------------------style-----------------------------------------------//


const Wrapper = styled.div`
   color: ${props => props.theme.color.slate};
   background: ${props => props.theme.color.ice};
   display: flex;
   flex-direction: column;
   align-items: center;
  
`

const Section = styled.div`
   margin-top: 10rem;
   background: white;
   width: 70rem;
   height: 90rem;
   position: relative;
   display: flex;
   flex-direction: column;
   align-items: center;
`

const Buttons = styled.div`   
    display: flex;
    justify-content: space-around;
    flex-direction: column;
`


const Title = styled.div`   
    font-size: 4rem;
    width: 100%;
    height: 10rem;
    text-align: center;
    margin-top: 5rem;
    font-wight: 700;
`

const Form = styled.form`
    width: 70%;
    height: 30rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Error = styled.form`
    width: 80%;
    height: 4rem;
    text-align: center;
    font-size: 2rem;
    color: ${props => props.theme.color.salmon}
`
const Logo = styled.div`
        width: 18rem;
        height: 18rem;
        position: absolute;
        top: -19%;
        left: 38%;

`

const ClickableText = styled.div`
  margin-top: 17rem;
  font-size: 1.4rem;
  color: 

`
const LinkWrapper = styled(NavLink)`
    font-weight: 700;
`

const RedText = styled.div`
    color: ${props => props.theme.color.salmon};
    font-size: 2rem;
`