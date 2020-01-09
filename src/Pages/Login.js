import React, { Component } from 'react'
import FormInput from "../UI/Forms/Input"
import styled from "styled-components"
import ButtonDark from "../UI/Buttons/ButtonDark"
import { NavLink} from "react-router-dom"
import {signInWithGoogle} from "../firebase/firebaseUtils"
import LinkButton from "../UI/Buttons/LinkButton"

const Login = () => {

    return (
    <Wrapper>

            <Title>
                  Lets Get Started
            </Title>
            <Form>
                <FormInput label={"Email"} type={"email"}/>
                <FormInput label={"Password"} type={"password"}/>
                <Buttons>
                    <ButtonDark text={"LOGIN"}/>
                    <ButtonDark text={"USE GOOGLE"} onClick={signInWithGoogle}/>
                </Buttons>

            </Form>
            <Title>
            Don't have an account? 
            </Title>
            <LinkButton to='/Onboarding'>Sign Up</LinkButton>
           
    </Wrapper>

    )
}

export default Login

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

const Form = styled.div`
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