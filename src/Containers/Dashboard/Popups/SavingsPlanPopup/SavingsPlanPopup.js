import React, { Component } from 'react'
import { SavingsPlanPopupStyled } from "./SavingsPlanPopupStyles"
import { connect } from 'react-redux'
import RangeBar from "../../../../Components/UI/RangeBar/RangeBar"
import {setVariable} from "../../../../actions"

 class SavingsPlanPopup extends Component {

    renderRangeBars = () => {
        return this.props.timelineRanges.map(a => {
            return <RangeBar 
                    type={a.type}
                    currency={a.currency}
                    classType={a.classType}
                    name={a.name}
                    label={a.label}
                    handleChange={(event) => this.props.setVariable(event)}
                    value={this.props.variables[a.name]}
                    step={a.step}
                    min={a.min}
                    max={a.max}
            />
        })
    }


    render() {
        return (
            <SavingsPlanPopupStyled>
                {this.renderRangeBars()}
            </SavingsPlanPopupStyled>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        variables: state.variables,
        timelineRanges: state.timelineRanges,
    }
}

export default connect(mapStateToProps, {setVariable})(SavingsPlanPopup)