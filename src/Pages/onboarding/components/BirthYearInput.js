import React, { useState } from 'react'
import FormInput from "UI/Forms/Input"
import styled from "styled-components"
import ButtonDark from "UI/Buttons/ButtonDark"
import { NavLink, Redirect} from "react-router-dom"
import {auth, signInWithGoogle} from "firebase/firebaseUtils"
import LinkButton from "UI/Buttons/LinkButton"

const Login = () => {


    return (
    <Wrapper>

            <Title>
                  Lets Get Started
            </Title>
            <Form onSubmit={handleSubmit}>
                <FormInput label="Email" handleChange={handleChange} type="email" value={email} name="email" required/>
                <FormInput label="Password" handleChange={handleChange} type="password" value={password} name="password" required/>
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
const Disclaimer = styled.div`
    text-align: center;
    font-size: 1.6rem;
`

const LinkWrapper = styled(NavLink)`
    font-weight: 700;
`