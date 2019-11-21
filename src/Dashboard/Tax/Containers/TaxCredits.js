import React, { Component } from 'react'
import styled, {keyframes, css} from "styled-components"
import {calculateFutureValue, calculateRRIFPaymentTable} from "../../../services/financialFunctions"
//import SmallRangeBar from "../../../UI/SmallRangeBar/SmallRangeBar"

export default class TaxCredits extends Component {

    //  miniRenderRangeBars = (miniRangeBarPropsArray) => {
    //      return miniRangeBarPropsArray.map(propsObject => <SmallRangeBar id={propsObject.name}
    //                                                                key={propsObject.name}
    //                                                                setIncome={this.props.setIncome}
    //                                                                rangeBarProps={propsObject}
    //                                                                />
                                                                  
    //       )
    //   }

    render() {


        return (
<div>hi</div>
            // <MiniRangeBarWrapper>
            // {this.miniRenderRangeBars(this.props.creditsRangeBarValues)}
            // </MiniRangeBarWrapper>


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

