import React from "react"
import {setUserDetail_action} from "redux/user/user_actions"
import Input from "UI/forms/Input"
import {connect} from "react-redux"
import styled from "styled-components"
import {rate1, rate2, investmentReturns_selector} from "redux/assumptions/assumptions_selectors"
import MiniRangeBar from "UI/miniRangeBar/MiniRangeBar"
import {setNestedUserDetail_action} from "redux/user/user_actions"
import {Title, Dialogue} from "pages/onboarding/components/FirstName"

const RetirementAge = ({count, user_reducer, setNestedUserDetail_action}) => {

    const {retirementAge} = user_reducer

    const handleChange = (value, nothing, {name}) => {
        console.log(name);
        setNestedUserDetail_action(name, "rangeBarValue", value)
      };

return (
    <>
        <Title>At what age would you like to become financially free? </Title>
                    {

            <MiniRangeBar
                                    id={retirementAge.name}
                                    key={retirementAge.name}
                                    setValue={handleChange}                                                        //Function Defined Above, sets the age in the reducer
                                    rangeBarProps={retirementAge}                                                                            //We pass in the entire object as rangeBarProps to have access to all it's properties throughout the cycle
            />
            }
        <Dialogue>Most Canadians are aiming for age 65, retiring earlier means you must save more. If you dont have much saved you'll have to delay retirement</Dialogue>
    </>

)
}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer,
    investmentReturns_selector: investmentReturns_selector(state),
})

export default connect(mapStateToProps, {setNestedUserDetail_action })(RetirementAge)

//-----------------------------------------------style-----------------------------------------------//

