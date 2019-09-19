import React, { Component } from 'react'
import { connect } from 'react-redux'
import {setVariable} from "../../actions"
import styled from "styled-components"

 class SavingsPlanApp extends Component {




    render() {
        return (
            <SavingsPlan>
                Savings Details Go here
            </SavingsPlan>
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

export default connect(mapStateToProps, {setVariable})(SavingsPlanApp)


//-----------------------------------------------STYLES-----------------------------------------------//

export const SavingsPlan = styled.div`
grid-area: m;
background-color: pink;
display: grid;
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
//blank slate