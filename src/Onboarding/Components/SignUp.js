import React, { useState } from 'react'
import FormInput from "../../UI/Forms/Input"
import styled from "styled-components"
import ButtonDark from "../../UI/Buttons/ButtonDark"
import  SquareButton from "../../UI/Buttons/SquareButton"
import { NavLink} from "react-router-dom"
import {signInWithGoogle} from "../../firebase/firebaseUtils"
import {auth, createUserProfileDocument} from "../../firebase/firebaseUtils"

const SignUp = () => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

   try {
      const {user} = await auth.createUserWithEmailAndPassword(email, password)
      createUserProfileDocument(user, {displayName})
      setUserCredentials({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
   }
   catch(error) {
      console.error(error)
   }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    console.log(name);
    setUserCredentials({ ...userCredentials, [name]: value });
  };
console.log(userCredentials.email);
    return (
    <Wrapper>

            <Title>
                  Lets Get Started
            </Title>
            <Form>
                <FormInput label="First Name" handleChange={handleChange} type="text" value={displayName} name="displayName" required/>
                <FormInput label="Email" handleChange={handleChange} type="email" value={email} name="email" required/>
                <FormInput label="Password" handleChange={handleChange} type="password" value={password} name="password" required/>
                <FormInput label="Confirm Password" handleChange={handleChange} type="password" value={confirmPassword} name="confirmPassword" required/>
                <ButtonDark text={"SIGN UP"} type="submit" onClick={handleSubmit}/>
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

export default SignUp

const Wrapper = styled.div`
   color: ${props => props.theme.color.slate};
   display: flex;
   flex-direction: column;
   align-items: center;
  
`


const Title = styled.div`   
    font-size: 3rem;
    width: 100%;
    height: 20%;
    text-align: center;
    padding-top: 3rem;
`
const Buttons = styled.div`   
    display: flex;
    justify-content: space-around;
`

const Form = styled.div`
    width: 80%;
    height: 70%;
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

