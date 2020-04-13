import React, {useState} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import MiniRangeBar  from "UI/miniRangeBar1/MiniRangeBar"
import ButtonLight from "UI/buttons/ButtonLight"
import {rates_data} from "pages/onboard/data/onboard_data"
import {setKeyValue_action} from "redux/actions"
import {ArrowLeft} from "style/Icons"

const InvestmentFactor = ({setKeyValue_action,  user_reducer}) => {    

        const [visible, setVisible] = useState(false)
   
        return (
        <>
        {
            visible ? 
            <Wrapper>                                                                     
                <Header>
                <BackArrow onClick={() => setVisible(false)}/>
                <h2>Investment Factors</h2> 
                </Header>
                <Container> 
                <MiniRangeBarWrapper>
                    {
                        rates_data.slice(0,3).map(d =>  <MiniRangeBar
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
                </Container>
            </Wrapper>
            :
            <ButtonRightWrapper>
                <ButtonLight text="Rates" onClick={() => setVisible(true)}></ButtonLight>
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

const ButtonRightWrapper = styled.div`
    position: absolute;
    top: 24rem;
    left: 95rem;
`
const MiniRangeBarWrapper = styled.div`
    height: 24rem;
    width: 60rem;
    display: flex;
    flex-wrap: wrap;
`
const Wrapper = styled.div`
    width: 70rem;
    border-radius: 5px;
    overflow: hidden;
    height: 28rem;                                                    
    border: ${props => props.theme.border.primary};
    position: absolute;
    top: 35rem;
    left: 36rem;
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
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

`
const Container = styled.div`
    display: flex;
    align-content: center;
    position: relative;
`

const BackArrow = styled(ArrowLeft)`
    width: 3.5rem;
    height: 3.5rem;
    position: absolute;
    color: ${props => props.theme.color.ice};
    top: 0rem;
    left: 1rem;
    cursor: pointer;

`