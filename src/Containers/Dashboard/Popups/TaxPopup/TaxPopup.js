import React, { Component } from 'react'
import {PopupStyled, PopupHeaderStyled, MainText, MainSubText, IncomeSliders, DeductionSliders, Results } from "./TaxPopupStyles"
import {Link} from "react-router-dom"
import RangeBar from "../../../../Components/UI/RangeBar/RangeBar"
import { connect } from 'react-redux'


class TaxPopup extends Component {



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
                <RangeBar
                    type="range"
                    label="Change your Age"
                    value={20}
                    step={10}
                    onChange={22}
                    min={0}
                    max={90}/>
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

export default connect(mapStateToProps

    )(TaxPopup)