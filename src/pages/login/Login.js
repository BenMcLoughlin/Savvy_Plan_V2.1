import React, { useState } from 'react'
import Input from "UI/forms/Input"
import styled from "styled-components"
import ButtonLight from "UI/buttons/ButtonLight"
import {Redirect} from "react-router-dom"
import {auth} from "firebase/firebaseUtils"
import {signInWithGoogle} from "firebase/firebaseFunctions"
import LinkButton from "UI/buttons/LinkButton"
import {connect} from "react-redux"
import {signIn_action} from "redux/auth/auth_actions"
import logoLight from "assets/svgs/SavvyPlan_logo_final_justlogo.svg"


const Login = ({loginError, signIn_action, auth}) => {

    const [userCredentials, setCredentials] = useState({
        email: '',
        password: ''
      });
      const [loggedIn, setLoggedIn] = useState(false)

  const { email, password } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();
    signIn_action(userCredentials)

  };

  const handleChange = event => {
    const { value, name } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  if (auth.uid) return <Redirect to="/"/>

    return (
    <Wrapper>
        <Section>
             <Logo>
                    <img src={logoLight} height="100%" width="100%" fontSize="10rem" alt="logo"/>
            </Logo>
             <Title>
                  Sign in to Savvy Plan
            </Title>

            <Error>{loginError ? 'Login failed, please check your credentials and try again.' : null}</Error> 
            <Form onSubmit={handleSubmit}>
                <Input label="Email" handleChange={handleChange} type="email" value={email} name="email" required/>
                <Input label="Password" handleChange={handleChange} type="password" value={password} name="password" required/>
                <Buttons>
                    <ButtonLight text={"Sign In"} type="submit"/>
                    <ButtonLight text={"USE GOOGLE"} onClick={signInWithGoogle}/>
                </Buttons>
                {
                  loggedIn ? 
                  <Redirect to="/dashboard"/>
                  : null
                }
            </Form>
            <ClickableText>
              Forgot Password? 
            </ClickableText>
        </Section>

            <Title>
              <LinkButton to="/signup">
              Sign UP
            </LinkButton>
            </Title>
           
    </Wrapper>

    )
}

const mapStateToProps = (state) => ({
  loginError: state.auth.loginError,
  auth: state.firebase.auth,
})

export default connect(mapStateToProps, {signIn_action})(Login)


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

const Title = styled.div`   
    font-size: 4rem;
    width: 100%;
    height: 10rem;
    text-align: center;
    margin-top: 5rem;
    font-wight: 700;
`
const Buttons = styled.div`   
    display: flex;
    justify-content: space-around;
    flex-direction: column;
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
  margin-top: 4rem;
  font-size: 1.4rem;
  color: 

`