import React, {useState} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import {setProgress_action} from "redux/progress/progress_actions"


const Income = ({progress_reducer, setProgress_action}) => {
    const [count, setCount] = useState(progress_reducer.netWorth)                                       // Controls Count for wizard display
    
    const setCountAndProgress = (section, number) => {
        setProgress_action(section, number)
        setCount(number)
    }
        return (
            <Page>

            </Page>
        )
}

const mapStateToProps = (state) => {
    return {
        progress_reducer: state.progress_reducer
    }
}

export default connect(mapStateToProps, {})(Income)


//-----------------------------------------------style-----------------------------------------------//

const Page = styled.div`
    ${props => props.theme.pageBaseStyles}
    grid-template-rows: minmax(8rem, 14rem) minmax(18rem, 22rem) minmax(22rem, 24rem);
    grid-template-areas:
    'a a a a a a a a a a a a'
    'b b b b b b b b b b b b'
    'c c c c c c c c c c c c'
`
const ChartPlaceHolder = styled.div`
    grid-area: b;
    width: 90%;
    margin-left: 5%;
    height: 100%;

`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/* Shows the user the control panel, the tile pane and the chart of the LifeTime Income Calculator. 

The main functions for this app are written here in the app. 

*/