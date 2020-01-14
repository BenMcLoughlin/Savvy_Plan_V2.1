import React, { useState } from 'react'
import Input from "UI/Forms/Input"
import styled from "styled-components"
import ButtonDark from "UI/Buttons/ButtonDark"
import {Redirect} from "react-router-dom"
import {auth, signInWithGoogle} from "firebase/firebaseUtils"
import LinkButton from "UI/Buttons/LinkButton"

const Login = () => {

    const [userCredentials, setCredentials] = useState({
        email: '',
        password: ''
      });
      const [loggedIn, setLoggedIn] = useState(false)

  const { email, password } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();
    try {
        await auth.signInWithEmailAndPassword(email, password)
        setLoggedIn(true)
        setCredentials({
            email: '',
            password: ''
          })
    } catch(error) {
        console.log(error);
    }

  };

  const handleChange = event => {
    const { value, name } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

    return (
    <Wrapper>

            <Title>
                  Lets Get Started
            </Title>
            <Form onSubmit={handleSubmit}>
                <Input label="Email" handleChange={handleChange} type="email" value={email} name="email" required/>
                <Input label="Password" handleChange={handleChange} type="password" value={password} name="password" required/>
                <Buttons>
                    <ButtonDark text={"LOGIN"} type="submit"/>
                    <ButtonDark text={"USE GOOGLE"} onClick={signInWithGoogle}/>
                </Buttons>
                {
                  loggedIn ? 
                  <Redirect to="/dashboard"/>
                  : null
                }
            </Form>
            <Title>
            Don't have an account? 
            </Title>
            <LinkButton to='/Onboarding'>Sign Up</LinkButton>
           
    </Wrapper>

    )
}

export default Login


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
    height: 10%;
    text-align: center;
    padding-top: 3rem;
`
const Buttons = styled.div`   
    display: flex;
    justify-content: space-around;
`

const Form = styled.form`
    width: 80%;
    height: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
`