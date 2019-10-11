import React, { Component } from 'react'

import styled from "styled-components"

export default class CreditScoreApp extends Component {

    state = {
        creditScore: 450
    }

    
    render() {
        return (
            <div>
                You have a Good credit score
            </div>
        )
    }
}

