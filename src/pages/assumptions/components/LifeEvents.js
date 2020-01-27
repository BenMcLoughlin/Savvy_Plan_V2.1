import React from 'react'
import styled from "styled-components"
import MiniRangeBar from "UI/miniRangeBar/MiniRangeBar"
import {connect} from "react-redux"
import {lifeEventsArray} from "redux/lifeEvents/lifeEvents_selectors"


const  LifeEvents = ( {lifeEventsArray}) => {                                            //Use Destructing to assign variables and functions
          
    return (
        <Wrapper>                                                                                                                         {/* This walks through the pensionStartAges_reducer provided from the reducer and rendersa miniRangeBar for each */}
               { lifeEventsArray.map(d => <MiniRangeBar
                                            id={d.name}
                                            key={d.name}
                                            setValue={() => console.log('hi')}                                                        //Function Defined Above, sets the age in the reducer
                                            rangeBarProps={d}                                                                            //We pass in the entire object as rangeBarProps to have access to all it's properties throughout the cycle
                    />)
               }

        </Wrapper>                            
    )
}

const mapStateToProps = (state) => {
    return {
        lifeEventsArray: lifeEventsArray(state),
    }
}

export default connect(mapStateToProps, {})(LifeEvents)
//-----------------------------------------------style-----------------------------------------------//


const Wrapper= styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 6rem;
`
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*

This component renders the MiniRangeBars on the bottom right of the Control panel. These range bars change the pension start ages such as
CPP, OAS, and rrsp ages at which the user would begin collecting pension. There is also one rangebar that changes the interest rate return of the
RRSP savings.

*/