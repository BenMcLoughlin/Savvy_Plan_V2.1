import React, {useState} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import MiniRangeBar  from "UI/miniRangeBar1/MiniRangeBar"
import ButtonLight from "UI/buttons/ButtonLight"
import {rates_data} from "pages/onboard/data/onboard_data"
import {setKeyValue_action} from "redux/actions"

const InvestmentFactor = ({setKeyValue_action,  user_reducer}) => {    


        const [visible, setVisible] = useState(false)
    return (
        <>
        {
            visible ? 
            <Wrapper>                                                                     

            <Header>
            <h2>Investment Factors</h2> 
            </Header>
            <Container> 
            <MiniRangeBarWrapper>
                {
                    rates_data.slice(0,4).map(d =>  <MiniRangeBar
                                                                            label={d.label}
                                                                            name={d.name}
                                                                            reducer={"user_reducer"}
                                                                            setKeyValue_action={setKeyValue_action}                                                                      
                                                                            step={d.step}
                                                                            value={user_reducer[d.name]}
                                                                            min={d.min}
                                                                            max={d.max}
                                                                            numberType={d.numberType}
                        />
                )
                }

            </MiniRangeBarWrapper>
            <ButtonLeftWrapper>
                <ButtonLight text="Back" onClick={() => setVisible(false)}></ButtonLight>
            </ButtonLeftWrapper>
            </Container>
            </Wrapper>
            :
            <ButtonRightWrapper>
                <ButtonLight text="Investment Factors" onClick={() => setVisible(true)}></ButtonLight>
            </ButtonRightWrapper>
        }
    </>
       
    )

}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer,
})

export default connect(mapStateToProps, {setKeyValue_action})(InvestmentFactor )


//-----------------------------------------------STYLES-----------------------------------------------//


const ButtonLeftWrapper = styled.div`
    position: absolute;
    bottom: 2rem;
    left: -14rem;
`
const ButtonRightWrapper = styled.div`
    position: absolute;
    bottom: 5rem;
    left: 95rem;
`
const MiniRangeBarWrapper = styled.div`
    height: 28rem;
    width: 40rem;
    display: flex;
    flex-wrap: wrap;
`
const Wrapper = styled.div`
    width: 77rem;
    border-radius: 5px;
    overflow: hidden;
    height: 33rem;                                                    
    border: ${props => props.theme.border.primary};
    position: absolute;
    top: 36rem;
    left: 37rem;
    display: flex;
    z-index: 700;
    background: ${props => props.theme.color.ice};
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Header = styled.div`
    width: 100%;
    background: ${props => props.theme.color.turquoise};
    height: 4rem;
    color: ${props => props.theme.color.ice};

`
const Container = styled.div`
    display: flex;
    align-content: center;
    position: relative;
`
