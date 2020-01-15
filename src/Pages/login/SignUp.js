import React, { useState } from 'react'
import FormInput from "UI/Forms/Input"
import styled from "styled-components"
import ButtonDark from "UI/Buttons/ButtonDark"
import { NavLink, Redirect} from "react-router-dom"
import {signInWithGoogle} from "firebase/firebaseUtils"
import {auth, createUserProfileDocument} from "firebase/firebaseUtils"
import {signUp_action} from "redux/auth/auth_actions"
import {connect} from "react-redux"


const SignUp = ({auth, authError, signUp_action}) => {

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
  if (auth.uid) return <Redirect to="/Onboarding"/>

    return (
    <Wrapper>
            <Title>
                  Lets Get Started
            </Title>
            <Form onSubmit={handleSubmit}>
                <FormInput label="First Name" handleChange={handleChange} type="text" value={firstName} name="firstName" required/>
                <FormInput label="Email" handleChange={handleChange} type="email" value={email} name="email" required/>
                <FormInput label="Password" handleChange={handleChange} type="password" value={password} name="password" required/>
                <FormInput label="Confirm Password" handleChange={handleChange} type="password" value={confirmPassword} name="confirmPassword" required/>
                <ButtonDark text={"SIGN UP"} type="submit" onClick={handleSubmit} />
                <RedText>
                    {authError ? <p>{authError}</p> : null}
                </RedText>
              
            </Form>
            <Buttons>
                    <ButtonDark text={"LOGIN"}/>
                    <ButtonDark text={"USE GOOGLE"} onClick={signInWithGoogle}/>
                </Buttons>
            <Disclaimer> 
                By Clicking Sign Up you are accepting our 
                <LinkWrapper to='/Onboarding'> Terms of Use</LinkWrapper>
            </Disclaimer> 
    </Wrapper>

    )
}

const mapStateToProps = (state) => {
  return {
      auth: state.firebase.auth,
      authError: state.auth.authError,
  }
}

export default connect(mapStateToProps, {signUp_action})(SignUp)


//-----------------------------------------------STYLES-----------------------------------------------//


const Wrapper = styled.div`
   color: ${props => props.theme.color.slate};
   display: flex;
   flex-direction: column;
   align-items: center;
  
`


const Title = styled.div`   
    font-size: 3rem;
    width: 100%;
    height: 15rem;
    text-align: center;
    padding-top: 3rem;
`
const Buttons = styled.div`   
    display: flex;
    justify-content: space-around;
`

const Form = styled.div`
    width: 80%;
    height: 50rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Disclaimer = styled.div`
    text-align: center;
    font-size: 1.6rem;
`

const LinkWrapper = styled(NavLink)`
    font-weight: 700;
`

const RedText = styled.div`
    color: ${props => props.theme.color.salmon};
    font-size: 2rem;
`