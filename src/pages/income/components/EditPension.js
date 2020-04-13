import React, {useEffect} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import MiniRangeBar from "UI/miniRangeBar1/MiniRangeBar"
import _ from "lodash"
import {setKeyValue_action} from "redux/actions"
import {cpp_selector, oas_selector, income_selector} from "redux/main/income_selectors"
import {hideStream} from "services/ui/ui_functions"
import {ArrowLeft} from "style/Icons"

const EditIncome = ({income_selector, ui_reducer, user_reducer, setKeyValue_action, cpp_selector, oas_selector}) => {                                           //this is the box that enables us to edit an income stream and add new instances

    const {stream, id} = ui_reducer                  
    const {lifeSpan, cppStartAge, oasStartAge} = user_reducer                                                                                           //the ui reducer has the stream being shown as well as the selected id for the instance, we pull these out so we have them here
    
    console.log("stream, id", stream, id );
    console.log('income_selector ', income_selector );
    const {[id]: instance} = income_selector                                                                                                   //we use id to grab the entire object from the income_selector
    const {value, base} = instance
    const difference = value - base
    const period = stream === "CPP Income" ? lifeSpan - cppStartAge : lifeSpan - oasStartAge
    const label = stream === "CPP Income" ? "CPP Start Age" : "OAS Start Age"
    const name = stream === "CPP Income" ? "cppStartAge" : "oasStartAge"
    const age= stream === "CPP Income" ? cppStartAge : oasStartAge
    const min= stream === "CPP Income" ? 60 : 65

    return (
        <Wrapper>
            <Header color={instance.color}>
            <BackArrow  onClick={() => hideStream(setKeyValue_action)}/>
            <h2>{_.startCase(stream)}</h2> 
            </Header>                                                
            <Container >                                                                      
                <Left>           
                < MiniRangeBar 
                   label={label}
                   name={name}
                   reducer={"user_reducer"}
                   setKeyValue_action={setKeyValue_action}                                                                         //We pass in the entire object as rangeBarProps to have access to all it's properties throughout the cycle
                   step={1}
                   value={age}
                   min={min}
                   max={70}
                   />      
                < MiniRangeBar 
                    label={"Life span"}
                    name={'lifeSpan'}
                    reducer={"user_reducer"}
                    setKeyValue_action={setKeyValue_action}                                                                         //We pass in the entire object as rangeBarProps to have access to all it's properties throughout the cycle
                    step={1}
                    value={lifeSpan}
                    min={70}
                    max={110} 
                />                                                                                                              
                </Left>
                <Right>
                <Display>
                    <Summary>
                        {`${((value)/12).toFixed()}`}  
                            <h3>Monthly Payment</h3>
                        </Summary>
                        <Summary difference={difference} >
                        {`${((difference)/12).toFixed()}`}  
                            <h3 >{difference > 0 ? "increase" : "reduction"}</h3>
                        </Summary>
                        <Vr/>
                        <Summary>
                        {`${Math.round((period*value)/1000)}k`}
                        <h3 >Total Earnings</h3>
                        </Summary>
                </Display>
                </Right>
            </Container>
        </Wrapper>
    )
}

const mapStateToProps = (state) => ({
    income_selector: income_selector(state),
    user_reducer: state.user_reducer,
    ui_reducer: state.ui_reducer,
    cpp_selector: cpp_selector(state),
    oas_selector: oas_selector(state),
})

export default connect(mapStateToProps, {setKeyValue_action})(EditIncome)


//-----------------------------------------------STYLES-----------------------------------------------//

const Wrapper = styled.div`
    width: 90rem;
    height: 28rem;
    margin:1rem auto;
    border-radius: 5px;
    overflow: hidden;
    border: ${props => props.theme.border.primary};
    grid-area: c;
    z-index: 1000;
    grid-area: c
`

const Left = styled.div`  
    width:  40%;
    height: 100%;
    padding: 2rem;
    margin-left: 4rem;
    display: flex;
`
const Right = styled.div`
    width:  60%;
    padding: 2rem;
`

const Container = styled.div`
    width: 100%;
    height: 22rem;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    display: flex;
    background: ${props => props.theme.color.ice};
`
const Header = styled.div`
    width: 100%;
    background: ${props => props.color};
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.color.ice};
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

const Summary = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin-top: 1rem;
    cursor: pointer;
    font-size: ${props => props.theme.fontSize.mediumLarge};
    align-items: center;
    justify-content: center;
    width: 12rem;
    font-weight: 300;
    color: ${props => props.difference < 0 ? props.theme.color.salmon : null};
  
`

const Vr = styled.div`
    height: 60%;
    width: 1%;
    margin-top: 2rem;
    flex-basis: 0.1;
    flex: 1 0.1 1;
    border-left: ${props => props.theme.border.primary};
`
const Display = styled.div`
    display: flex;
    width: 100%;
    border-bottom: ${props => props.theme.border.primary};
`
