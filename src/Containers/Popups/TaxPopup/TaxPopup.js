import React, { Component } from 'react'
import {PopupStyled, PopupHeaderStyled, MainText, MainSubText, IncomeSliders, DeductionSliders, Results } from "./TaxPopupStyles"
import {Link} from "react-router-dom"
import RangeBar from "../../../Shared/UI/RangeBar/RangeBar"
import { connect } from 'react-redux'

class TaxPopup extends Component {

    renderRangeBars() {
       return this.props.IncomeRanges.map(a => {
           return (
               <RangeBar
                    className={a.className}
                    name={a.name}
                    min={a.min}
                    max={a.max}
                    label={a.label}
                    step={a.step}
                    type={a.type}
                    value={20}
                    onChange={this.props.handleSlider}       
                    explanation={a.explanation}    
            />)
       })
    }

    render() {
        console.log(this.props.IncomeRanges);
        return (
            <PopupStyled>
                 <Link style={{ textDecoration: 'none', color: "grey", cursor: "pointer",  position:"absolute", top: "2rem", right: "2rem"}} to="/">
                    <i style={{fontSize: "2.5rem"}}class="far fa-times-circle"></i>
                 </Link>
                <PopupHeaderStyled>
                    <MainText>Understand Your Tax Position</MainText>
                    <MainSubText>Play with the sliders to see how your income impacts your taxes payable.</MainSubText>
                </PopupHeaderStyled>
                <IncomeSliders>
                    Main Sources Of Income
                    {this.renderRangeBars()}
                </IncomeSliders>
                <DeductionSliders>
                
                </DeductionSliders>
                <Results>
                
                </Results>

            </PopupStyled>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {IncomeRanges: state.IncomeRanges}
}

export default connect(mapStateToProps)(TaxPopup)