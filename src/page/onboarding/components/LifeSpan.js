import React from "react"
import {setUserDetail_action} from "redux/user/user_actions"
import Input from "UI/forms1/Input"
import {connect} from "react-redux"
import styled from "styled-components"
import {rate1, rate2, investmentReturnsArray} from "redux/assumptions/assumptions_selectors"
import minirangebar1 from "UI/miniRangeBar1/MiniRangeBar"
import {setNestedUserDetail_action} from "redux/user/user_actions"

const LifeSpan = ({count, user_reducer, setNestedUserDetail_action}) => {

    const {lifeSpan} = user_reducer

    console.log(user_reducer);
    const handleChange = (value, nothing, {name}) => {
        console.log(name);
        setNestedUserDetail_action(name, "rangeBarValue", value)
      };

return (
    <>
        <Title>What would you like to use as your estimated life span? </Title>
        <Dialogue> For planning purposes we like to use 95. The longer it is the more you have to save to fund those years.</Dialogue>

        {

                 <minirangebar1 
                                            id={lifeSpan.name}
                                            key={lifeSpan.name}
                                            setValue={handleChange}                                                        //Function Defined Above, sets the age in the reducer
                                            rangeBarProps={lifeSpan}                                                                            //We pass in the entire object as rangeBarProps to have access to all it's properties throughout the cycle
                    />
            }

    </>

)
}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer,
    investmentReturnsArray: investmentReturnsArray(state),
})

export default connect(mapStateToProps, {setNestedUserDetail_action })(LifeSpan)

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