import React from "react"
import {setNestedUserDetail_action} from "redux/user/user_actions"
import SelectOptionCard from "UI/Forms/SelectOptionCard"
import {connect} from "react-redux"
import styled from "styled-components"

const Priorities = ({user_reducer, setNestedUserDetail_action}) => {

    const setValue = (name, value) => {

        setNestedUserDetail_action("priorities", name, value)
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

export default connect(mapStateToProps, {setNestedUserDetail_action})(Priorities)

//-----------------------------------------------STYLES-----------------------------------------------//

const Title = styled.div`   
    font-size: 3rem;
    width: 100%;
    height: 10rem;
    text-align: center;
    padding-top: 3rem;
    color: ${props => props.theme.color.slate}
`
const CardWrapper = styled.div`
        min-height: 40rem;
        max-height: 50rem;
        width: 70rem;
        background: white;
        z-index: 500;

        display: flex;
        flex-wrap: wrap;
        padding: 2rem;
`