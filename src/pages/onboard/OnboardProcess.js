import React, {useState} from 'react'
import styled from "styled-components"
import ButtonLight from "UI/buttons/ButtonLight"
import {connect} from "react-redux"
import FirstName from "pages/onboard/components/FirstName"
import BirthYear from "pages/onboard/components/BirthYear"
import Province from "pages/onboard/components/Province"
import Spouse from "pages/onboard/components/Spouse"
import Children from "pages/onboard/components/Children"
import RatesOfReturn from "pages/onboard/components/RatesOfReturn"
import RetirementAge from "pages/onboard/components/RetirementAge"
import LifeSpan from "pages/onboard/components/LifeSpan"
import LifeEvents from "pages/onboard/components/LifeEvents"
import { Redirect} from "react-router-dom"
import {setKeyValue_action} from "redux/actions"

function OnboardingProcess({setKeyValue_action}) {

    const [count, setCount] = useState(6);

    if (count > 12) return <Redirect to="/"/>

    const setCountAndProgress = (section, number) => {
        setKeyValue_action(section, "progress_reducer", number)
        setCount(number)
    }
        return (
                 <Wrapper>
                    <Form>
                       {
                            count === 0 ? 
                            <FirstName/>
                            :
                            count === 1 ? 
                            <BirthYear/>
                            :
                            count === 2 ? 
                            <Province/>
                            :
                            count === 3 ? 
                            <Spouse/>
                            :
                            count === 4 ? 
                            <Children/>
                            :
                            count === 5 ? null
                            :
                            count > 5 && count < 11 ? 
                            <RatesOfReturn count={count}/>
                            :
                            count === 11 ? 
                            <RetirementAge/>
                            :
                            count === 12 ? 
                            <LifeSpan/>
                            :
                            count === 13 ? 
                            <LifeEvents/>
                            :
                            null
                        }
                    </Form>
                   <Buttons>
                                < ButtonLight backward onClick={() => setCountAndProgress("onboard", (count > 0 ? count - 1 : 0))}/>
                                < ButtonLight forward onClick={() => setCountAndProgress("onboard", ( count < 14 ? count + 1 : 14))}/>      
                    </Buttons>
                </Wrapper>
        )
          
    }


const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer
})   

export default connect(mapStateToProps, {setKeyValue_action})(OnboardingProcess)
//-----------------------------------------------style-----------------------------------------------//

const Wrapper = styled.div`
    grid-area: m;
    margin-top: 5rem;
    display: grid;
    margin: 0 auto;
    height: 90vh;
    width:  80vw
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
`
const Form = styled.form`
    min-height: 30rem;
    width: 50rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20rem;
    margin: 0 auto;
`

const Buttons = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    position: absolute;
    top: 60rem;
    left: 25%;
`
