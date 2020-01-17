import React from "react"
import {setUserDetail_action} from "redux/user/user_actions"
import Input from "UI/Forms/Input"
import {connect} from "react-redux"
import styled from "styled-components"
import {rate1, rate2, investmentReturnsArray} from "redux/assumptions/assumptions_selectors"
import MiniRangeBar from "UI/MiniRangeBar/MiniRangeBar"
import {setNestedUserDetail_action} from "redux/user/user_actions"

const RetirementAge = ({count, user_reducer, setNestedUserDetail_action}) => {

    const {retirementAge} = user_reducer

    const handleChange = (value, nothing, {name}) => {
        console.log(name);
        setNestedUserDetail_action(name, "rangeBarValue", value)
      };

return (
    <>
        <Title>At what age would you like to become financially free? </Title>
        <Dialogue>Most Canadians are aiming for age 65, retiring earlier means you must save more. If you dont have much saved you'll have to delay retirement</Dialogue>

        {

                 <MiniRangeBar 
                                            id={retirementAge.name}
                                            key={retirementAge.name}
                                            setValue={handleChange}                                                        //Function Defined Above, sets the age in the reducer
                                            rangeBarProps={retirementAge}                                                                            //We pass in the entire object as rangeBarProps to have access to all it's properties throughout the cycle
                    />
            }

    </>

)
}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer,
    investmentReturnsArray: investmentReturnsArray(state),
})

export default connect(mapStateToProps, {setNestedUserDetail_action })(RetirementAge)

//-----------------------------------------------style-----------------------------------------------//

const Title = styled.div`   
    font-size: 3rem;
    width: 70rem;
    height: 10rem;
    text-align: center;
    padding-top: 3rem;
    color: ${props => props.theme.color.slate}
`

const Dialogue = styled.div`   
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 60rem;
    height: 16rem;
    padding-top: 3rem;
    color: ${props => props.theme.color.slate}
    & span {
        padding: 1rem;
        font-size: 1.4rem;
        font-style: italic;
        text-align: left;
    }
`