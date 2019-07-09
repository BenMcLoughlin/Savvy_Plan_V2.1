import React, { Component } from 'react'
import {Link} from "react-router-dom"
import RangeBar from "../../../../Components/UI/RangeBar/RangeBar"
import { connect } from 'react-redux'


class TaxPopup extends Component {



    render() {
        console.log(this.props.IncomeRanges);
        return (
            <div>
                 Taxes

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {IncomeRanges: state.IncomeRanges}
}

export default connect(mapStateToProps

    )(TaxPopup)