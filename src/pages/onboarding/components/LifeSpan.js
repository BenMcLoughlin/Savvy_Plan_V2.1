import React from "react"
import {setUserDetail_action} from "redux/user/user_actions"
import Input from "UI/forms/Input"
import {connect} from "react-redux"
import styled from "styled-components"
import {rate1, rate2, investmentReturnsArray} from "redux/assumptions/assumptions_selectors"
import MiniRangeBar from "UI/miniRangeBar/MiniRangeBar"
import {setNestedUserDetail_action} from "redux/user/user_actions"
import {Title, Dialogue} from "pages/onboarding/components/FirstName"

const LifeSpan = ({count, user_reducer, setNestedUserDetail_action}) => {

    const {lifeSpan} = user_reducer

    const handleChange = (value, nothing, {name}) => {
        console.log(name);
        setNestedUserDetail_action(name, "rangeBarValue", value)
      };

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
    investmentReturnsArray: investmentReturnsArray(state),
})

export default connect(mapStateToProps, {setNestedUserDetail_action })(LifeSpan)

//-----------------------------------------------style-----------------------------------------------//

