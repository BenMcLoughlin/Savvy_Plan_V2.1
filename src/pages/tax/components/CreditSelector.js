import React from "react"
import SelectOptionCard from "UI/forms/SelectOptionCard"
import {connect} from "react-redux"
import styled from "styled-components"


const CreditSelector = ({}) => {

    const setValue = (name, value) => {

      };


return (
    <>
        <CardWrapper>
                {
                
                }      
        </CardWrapper>

    </>

)
}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer
})

export default connect(mapStateToProps, {})(CreditSelector)

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
export const Title = styled.div`   
    font-size: 3rem;
    width: 100%;
    height: 14rem;
    padding: 2rem;
    text-align: center;
    padding-top: 3rem;
    color: ${props => props.theme.color.slate}
`