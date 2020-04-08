import React, {useState} from 'react'
import styled from "styled-components"
import ButtonLight from "UI/buttons/ButtonLight"
import {connect} from "react-redux"
import FirstName from "pages/onboard/components/FirstName"
import BirthYear from "pages/onboard/components/BirthYear"
import Province from "pages/onboard/components/Province"
import Spouse from "pages/onboard/components/Spouse"
import RetireAndLifeSpan from "pages/onboard/components2/RetireAndLifeSpan"
import Accounts from "pages/onboard/components2/Accounts"
import Children2 from "pages/onboard/components2/Children"
import {ArrowRight, ArrowLeft} from "style/Icons"
import RetirementAge from "pages/onboard/components/RetirementAge"
import RentOrOwn from "pages/onboard/components2/RentOrOwn"
import GenderAndAge from "pages/onboard/components2/GenderAndAge"
import { Redirect} from "react-router-dom"
import {setKeyValue_action} from "redux/actions"

function OnboardingProcess({setKeyValue_action}) {

    const [count, setCount] = useState(0);

    if (count > 4) return <Redirect to="/income"/>

    const setCountAndProgress = (section, number) => {
        setKeyValue_action(section, "progress_reducer", number)
        setCount(number)
    }
        return (
                 <Wrapper>
                    <Form>
                       {
                            count === 0 ? 
                            <GenderAndAge/>
                            :
                            count > 0 && count <= 2 ? 
                            <Accounts count = {count}/>
                            :
                            count === 3 ? 
                          
                            <RentOrOwn />
                            :
                            count === 4 ? 
                           
                            <Children2/>
                            :
                            null
                        }
                        <ArrowR onClick={() => setCountAndProgress("onboard", ( count < 14 ? count + 1 : 14))}/>
                        <ArrowL onClick={() => setCountAndProgress("onboard", (count > 0 ? count - 1 : 0))}/>
                    </Form>

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
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15rem;
    margin: 0 auto;
    height: auto;
    position: relative;
`

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    margin: 0 auto;
`
const ArrowR = styled(ArrowRight)`
    position: absolute;
    top: 10rem;
    right: 1rem;
    width: 6rem;
    height: 6rem;
    color: ${props => props.theme.color.grey};
    cursor: pointer
`
const ArrowL = styled(ArrowLeft)`
    position: absolute;
    top: 10rem;
    left: 1rem;
    width: 6rem;
    height: 6rem;
    color: ${props => props.theme.color.grey};
    cursor: pointer
`