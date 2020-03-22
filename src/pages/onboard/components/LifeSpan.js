import React from "react"
import {connect} from "react-redux"
import styled from "styled-components"
import MiniRangeBar from "UI/miniRangeBar1/MiniRangeBar"
import {setKeyValue_action} from "redux/actions"
import {Title, Dialogue} from "pages/onboard/components/FirstName"

const LifeSpan = ({user_reducer, setKeyValue_action}) => {

    const {lifeSpan} = user_reducer
return (
    <>
        <Title>What would you like to use as your estimated life span? </Title>

                    {

            <MiniRangeBar
                        label={"Life span"}
                        name={'lifeSpan'}
                        reducer={"user_reducer"}
                        setKeyValue_action={setKeyValue_action}                                                                         //We pass in the entire object as rangeBarProps to have access to all it's properties throughout the cycle
                        step={1}
                        value={lifeSpan}
                        min={70}
                        max={110}                                                                          //We pass in the entire object as rangeBarProps to have access to all it's properties throughout the cycle
            />
            }
        <Dialogue> For planning purposes we like to use 95. The longer it is the more you have to save to fund those years.</Dialogue>
    </>

)
}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer,
})

export default connect(mapStateToProps, {setKeyValue_action })(LifeSpan)

//-----------------------------------------------style-----------------------------------------------//

