import React, { Component } from 'react'
import styled, {keyframes, css} from "styled-components"
import {calculateFutureValue, calculateRRIFPaymentTable} from "../../../services/financialFunctions"
import MiniRangeBar from "../../../UI/MiniRangeBar/MiniRangeBar"


export default class TaxCredits extends Component {



     miniRenderRangeBars = (miniRangeBarPropsArray) => {
         return miniRangeBarPropsArray.map(propsObject => <MiniRangeBar id={propsObject.name}
                                                                   key={propsObject.name}
                                                                   setValueInReducer={this.props.setValueInReducer}
                                                                   rangeBarProps={propsObject}
                                                                   />
                                                                  
          )
      }

    render() {
        console.log(this.props.creditsRangeBarValues);

        return (

            <MiniRangeBarWrapper>
            {this.miniRenderRangeBars(this.props.creditsRangeBarValues)}
            </MiniRangeBarWrapper>


        )
    }
}

//-----------------------------------------------STYLES-----------------------------------------------//

const MiniRangeBarWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// 

