import React, { Component } from 'react'
import styled from "styled-components"
import UserInterface from "./Containers/UserInterface"


export default class LifetimeIncomeApp extends Component {
    render() {
        return (
            <LifetimeIncome>
               <UserInterface/>
            </LifetimeIncome>
        )
    }
}


//-----------------------------------------------STYLES-----------------------------------------------//


export const LifetimeIncome = styled.div`
    grid-area: m;
    display: grid;
    width: 80%;
    margin: 0 auto;
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
//blank slate