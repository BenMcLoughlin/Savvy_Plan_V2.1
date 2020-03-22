import React from "react"
import Input from "UI/forms/Input"
import {connect} from "react-redux"
import styled from "styled-components"
import MiniRangeBar from "UI/miniRangeBar1/MiniRangeBar"
import {setKeyValue_action} from "redux/actions"
import {Title, Dialogue} from "pages/onboard/components/FirstName"

const RetirementAge = ({count, user_reducer, setKeyValue_action}) => {

    const {retirementAge} = user_reducer

return (
    <>
        <Title>At what age would you like to become financially free? </Title>
                    {

            <MiniRangeBar   
                        label={"Retirement Age"}
                        name={'retirementAge'}
                        reducer={"user_reducer"}
                        setKeyValue_action={setKeyValue_action}                                                                         //We pass in the entire object as rangeBarProps to have access to all it's properties throughout the cycle
                        step={1}
                        value={retirementAge}
                        min={20}
                        max={90}
                        />
            }
        <Dialogue>Most Canadians are aiming for age 65, retiring earlier means you must save more. If you dont have much saved you'll have to delay retirement</Dialogue>
    </>

)
}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer,
})

export default connect(mapStateToProps, {setKeyValue_action })(RetirementAge)

//-----------------------------------------------style-----------------------------------------------//

