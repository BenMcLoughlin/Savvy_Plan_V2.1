import React, { Component } from 'react'
import styled from "styled-components"


export default class BadCreditScore extends Component {

    render() {
        return (
            <BadCreditScoreWrapper>
                You have a Bad credit score
            </BadCreditScoreWrapper>
        )
    }
}

const BadCreditScoreWrapper = styled.div`
background-color: ${props => props.theme.color.backgroundColor1}
`