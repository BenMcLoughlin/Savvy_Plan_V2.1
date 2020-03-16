import React from "react"
import {connect} from "react-redux"
import styled from "styled-components"
import MiniRangeBar from "UI/miniRangeBar/MiniRangeBar"
import {setNestedKeyValue_action} from "redux/actions"
import {Title, Dialogue} from "pages/onboarding/components/FirstName"

const LifeSpan = ({user_reducer, setNestedKeyValue_action}) => {

    const {lifeSpan} = user_reducer

    const handleChange = (value, nothing, {name}) => {
     console.log(value);
        setNestedKeyValue_action("rangeBarValue", name, "user_reducer", value)
      }

return (
    <>
        <Title>What would you like to use as your estimated life span? </Title>

                    {

            <MiniRangeBar
                                    id={lifeSpan.name}
                                    key={lifeSpan.name}
                                    setValue={handleChange}                                                        //Function Defined Above, sets the age in the reducer
                                    rangeBarProps={lifeSpan}                                                                            //We pass in the entire object as rangeBarProps to have access to all it's properties throughout the cycle
            />
            }
        <Dialogue> For planning purposes we like to use 95. The longer it is the more you have to save to fund those years.</Dialogue>
    </>

)
}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer,
})

export default connect(mapStateToProps, {setNestedKeyValue_action })(LifeSpan)

//-----------------------------------------------style-----------------------------------------------//

