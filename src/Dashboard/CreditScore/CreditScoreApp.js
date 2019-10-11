import React, { Component } from 'react'
import BadCreditScore from "./BadCreditScore"
import GoodCreditScore from "./GoodCreditScore"
import styled from "styled-components"

export default class CreditScoreApp extends Component {

    state = {
        creditScore: 650
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state.creditScore);
    }


    render() {
        return (
            <CreditScore>
            Hello
            <input type="number" name="creditScore" value={this.state.CreditScore} onClick={(e) => this.handleChange(e)}/>
                {
                    this.state.creditScore < 500 ? <BadCreditScore/> : <GoodCreditScore/>

                }
            </CreditScore>
        )
    }
}





//-----------------------------------------------STYLES-----------------------------------------------/
export const CreditScore = styled.div`
grid-area: m;
background-color: yellow;
display: grid;
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
//blank slate`