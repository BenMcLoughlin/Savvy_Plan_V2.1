import React from "react"
import {setNestedKeyValue_action} from "redux/actions"
import SelectOptionCard from "UI/forms/SelectOptionCard"
import {connect} from "react-redux"
import styled from "styled-components"
import {Title} from "pages/onboarding/components/FirstName"

const Priorities = ({user_reducer, setNestedKeyValue_action}) => {

    const setValue = (name, value) => {

        setNestedKeyValue_action("priorities", name, "user_reducer", value)
      };
      const {priorities} = user_reducer

return (
    <>
        <Title>What are your financial planning priorities? </Title>
        <CardWrapper>
                {
                    Object.keys(priorities).map(d => <SelectOptionCard label={d} value={user_reducer.priorities[d]} setValue={setValue}/>)
                }      
        </CardWrapper>

    </>

)
}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer
})

export default connect(mapStateToProps, {setNestedKeyValue_action})(Priorities)

//-----------------------------------------------style-----------------------------------------------//


const CardWrapper = styled.div`
        height: 20rem;
        width: 100rem;
        background: white;
        z-index: 500;
        display: flex;
        flex-wrap: wrap;
        padding: 2rem;

`