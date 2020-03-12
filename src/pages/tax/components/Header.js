import React from 'react'
import styled from "styled-components"
import {connect} from "react-redux"

const Header = ({user_reducer}) => {

const {taxAge} = user_reducer


return (
            <Wrapper>
            <Left >                                                                                         {/* Displays the total shortfall, the value determines the color of the number negative for red or  positive for lightGrey */}
                <h1>
                   Age {taxAge}: Estimated Tax Position
                </h1>
            </Left>
            <Right>
            {/* <h2>Optimized Retirement Income Plan</h2>
            <Container >
                    <Summary>
                    {111}  
                        <h4>12</h4>
                        <Circle color={"#F29278"}/>
                    </Summary>
                    <Summary >
                    {`${222}k`}
                        <h4 >OAS</h4>
                        <Circle color={"#7DA8B8"}/>
                    </Summary>
                    <Vr/>
                    <Summary>
                    {`${222}k`}
                    <h4 >RRSP</h4>
                         <Circle color={"#B0CFE3"}/>
                    </Summary>
                    <Summary>
                    {`${100}k`}
                    <h4>TFSA</h4>
                         <Circle color={"#81CCAF"}/>
                    </Summary>
            </Container>
            <Summary>
             {`$3k`}
            <h4>Total</h4>
            </Summary> */}
            </Right>
            
            </Wrapper>
        )

}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer,
})

export default connect(mapStateToProps, {})(Header )

//-----------------------------------------------style-----------------------------------------------//


const Wrapper = styled.div`
    grid-area: a;                                                                                             {/*Grid-area set in Income, "a" positions it at the top */}
    height: 100%;
    width: 100%;
    display: flex;
    margin-top: 4rem;
    position: relative;
    color: ${props => props.theme.color.slate};
`

const Left = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

const Summary = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin-top: 1rem;
    cursor: pointer;
    font-size: ${props => props.theme.fontSize.medium};
    align-items: center;
    justify-content: center;

  
`

const Vr = styled.div`
    height: 60%;
    width: 1%;
    margin-top: 2rem;
    flex-basis: 0.1;
    flex: 1 0.1 1;
    border-left: ${props => props.theme.border.primary};
`

const Right = styled.div`
    width: 45%;
    margin-top: -4rem;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
`
const Circle = styled.div`
   border-radius: 50%;
   height: 1rem;
   width: 1rem;
   margin-top: .5rem;
   background: ${props => props.color}
   display: flex;
   align-items: center;
`


const Container = styled.div`
    display: flex;
    width: 60%;
    border-bottom: ${props => props.theme.border.primary};
`




