import React, { Component } from 'react'
import { connect } from 'react-redux'
import {SidebarStyled } from "./SidebarStyles"
import RangeBar from "../../Shared/UI/RangeBar/RangeBar"


 class Sidebar extends Component {

   renderTimelineRanges() {
    return this.props.timelineRanges.map(a => {
        return (
            <RangeBar 
            className={a.className}
            name={a.name}
            min={a.min}
            max={a.max}
            label={a.label}
            step={a.step}
            value={20}
            type={a.type}
            onChange={null}
            explanation={a.explanation}
    />
        )
    })
   } 

    render() {
        return (
            <SidebarStyled>
               
            </SidebarStyled>
        )
    }
}




const mapStateToProps = (state) => {
   return {timelineRanges: state.timelineRanges}
   return {financialsRanges: state.financialsRanges}
}


export default connect(mapStateToProps)(Sidebar)