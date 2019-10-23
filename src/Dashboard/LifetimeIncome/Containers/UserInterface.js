import React, { Component } from 'react'
import ControlPanel from "./ControlPanel/ControlPanel"
import TileDisplay from "./TileDisplay"
import styled from "styled-components"
import {connect} from "react-redux"
import StackedBarChart from "../Chart/StackedBarChart.js"

 class UserInterface extends Component {
     
    render() {
        const data = Object.values(this.props.lifetimeIncomeYearListState).map(d => {
            const incomeTypeArray = Object.keys(d.incomeType)
            const financialValueArray = Object.keys(d.incomeType).map(income => d.incomeType[income].financialValue)
            var result = {age: d.age};
            incomeTypeArray.forEach((key, i) => result[key] = financialValueArray[i]);          
          return result
        })
     
       const stackedKeys = Object.keys(this.props.lifetimeIncomeYearListState[18].incomeType)

        return (
            <UserInterfaceWrapper>
            <Header>Lifetime Income Bar Chart</Header>

                <ControlPanel/>
                <TileDisplay/>
                <ChartPlaceHolder>
                    <StackedBarChart 
                        data={data}
                        height={650}
                        width={400}
                        stackedKeys={stackedKeys}
                        showOASThreshold = {true}
                    />
                </ChartPlaceHolder>
               
            </UserInterfaceWrapper>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        lifetimeIncomeVariableState: state.lifetimeIncomeVariableState,
        lifetimeIncomeYearListState: state.lifetimeIncomeYearListState
    }
}

export default connect(mapStateToProps)(UserInterface)

//-----------------------------------------------STYLES-----------------------------------------------//

const UserInterfaceWrapper = styled.div`
    background: light-grey; 
    display: grid;
    grid-gap: 18px;
    grid-template-columns: repeat(16, minmax(5rem, 10rem));
    grid-template-rows: 4rem minmax(12rem, 14rem) 4rem repeat(2, minmax(12rem, 24rem));
    grid-template-areas:
    "h h h h h h h h h h h h h h h h"
    "p p p p p t t t t t t t t t t t"
    "p p p p p c c c c c c c c c c c"
    "p p p p p c c c c c c c c c c c"
    "p p p p p c c c c c c c c c c c"
    "p p p p p c c c c c c c c c c c"
    "p p p p p c c c c c c c c c c c"
`
const ChartPlaceHolder = styled.div`
    grid-area: c;
    width: 80rem;
    height: 80rem;

`
const Header = styled.div`
    grid-area: h;
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// Shows the user the control panel, the tile pane and the chart of the LifeTime Income Calculator. 